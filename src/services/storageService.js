import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_BUCKET = 'imagens';

/**
 * SERVIÇO DE COMPRESSÃO WEBP E UPLOAD PARA O SUPABASE STORAGE
 * Comprime imagens no formato WebP de alta eficiência e realiza upload para o bucket 'imagens'.
 */

/**
 * Comprime e converte qualquer imagem (File, Blob ou base64 DataURL) para o formato WebP
 * @param {File|Blob|string} imageSource - Imagem de entrada
 * @param {number} maxWidth - Largura máxima proporcional (padrão 1200px)
 * @param {number} maxHeight - Altura máxima proporcional (padrão 1200px)
 * @param {number} quality - Qualidade de compressão WebP de 0.0 a 1.0 (padrão 0.8)
 * @returns {Promise<{ blob: Blob, dataUrl: string, sizeKb: number }>}
 */
export async function compressImageToWebP(imageSource, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        let { width, height } = img;

        // Redimensionar proporcionalmente se exceder as dimensões máximas
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Preencher fundo com preto/transparência para garantir renderização perfeita
        ctx.fillStyle = '#0a0e14';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar como WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              // Fallback para JPEG se o navegador não suportar WebP no canvas
              canvas.toBlob(
                (fallbackBlob) => {
                  const dataUrl = canvas.toDataURL('image/jpeg', quality);
                  resolve({
                    blob: fallbackBlob,
                    dataUrl,
                    sizeKb: Math.round(fallbackBlob.size / 1024)
                  });
                },
                'image/jpeg',
                quality
              );
              return;
            }

            const dataUrl = canvas.toDataURL('image/webp', quality);
            resolve({
              blob,
              dataUrl,
              sizeKb: Math.round(blob.size / 1024)
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = (err) => {
        reject(new Error('Falha ao processar e carregar a imagem para compressão.'));
      };

      if (typeof imageSource === 'string') {
        img.src = imageSource;
      } else if (imageSource instanceof Blob || imageSource instanceof File) {
        img.src = URL.createObjectURL(imageSource);
      } else {
        reject(new Error('Tipo de imagem não suportado.'));
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Faz upload de até 3 imagens comprimidas em WebP para o Supabase Storage (bucket 'imagens')
 * @param {Array<File|string>} images - Lista de até 3 imagens
 * @param {string} partCode - Código da peça para compor o nome do arquivo
 * @returns {Promise<Array<string>>} - Lista de URLs públicas das imagens gravadas
 */
export async function uploadPartImagesToStorage(images, partCode = 'peca') {
  if (!images || images.length === 0) return [];

  // Limitar a no máximo 3 imagens por peça
  const targetImages = images.slice(0, 3);
  const uploadedUrls = [];

  for (let i = 0; i < targetImages.length; i++) {
    const rawImage = targetImages[i];
    if (!rawImage) continue;

    try {
      // 1. Comprimir para WebP leve
      const { blob, dataUrl } = await compressImageToWebP(rawImage, 1200, 1200, 0.82);

      if (!isSupabaseConfigured || !supabase) {
        // Se Supabase não estiver configurado, armazena DataURL diretamente
        uploadedUrls.push(dataUrl);
        continue;
      }

      // 2. Criar caminho único no bucket 'imagens': parts/{codigo}_{timestamp}_angulo_{i+1}.webp
      const cleanCode = (partCode || 'peca').replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `parts/${cleanCode}_${Date.now()}_angulo_${i + 1}.webp`;

      // 3. Fazer upload para o bucket 'imagens'
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, blob, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn(`Erro ao fazer upload da imagem ${i + 1} no bucket '${STORAGE_BUCKET}':`, error.message);
        // Em caso de falha de permissão no storage, usa o dataUrl local para não perder a foto
        uploadedUrls.push(dataUrl);
      } else {
        // 4. Obter a URL pública permanente
        const { data: publicUrlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(fileName);

        if (publicUrlData?.publicUrl) {
          uploadedUrls.push(publicUrlData.publicUrl);
        } else {
          uploadedUrls.push(dataUrl);
        }
      }
    } catch (err) {
      console.error(`Erro ao processar imagem ${i + 1}:`, err);
      if (typeof rawImage === 'string') {
        uploadedUrls.push(rawImage);
      }
    }
  }

  return uploadedUrls;
}
