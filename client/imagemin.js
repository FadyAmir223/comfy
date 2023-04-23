import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';
// import imageminWebp from 'imagemin-webp';
// import imageminGifsicle from 'imagemin-gifsicle';

(async () => {
  await imagemin(['public/**/*.{jpg,png,jpeg,webp,svg}'], {
    destination: join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      'server',
      'public'
    ),
    plugins: [
      imageminMozjpeg({
        progressive: true,
        quality: 75,
      }),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
      imageminOptipng({
        optimizationLevel: 3,
      }),
      imageminSvgo({
        plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
      }),
      // imageminWebp({ quality: 75 }),
      // imageminGifsicle(),
    ],
  });
})();
