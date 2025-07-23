import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const pcDir = path.join(publicDir, 'pc');
    const mobileDir = path.join(publicDir, 'mobile');

    const getImageFiles = (dir: string) => {
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map(file => file);
    };

    const pcImages = getImageFiles(pcDir).map(file => `/pc/${file}`);
    const mobileImages = getImageFiles(mobileDir).map(file => `/mobile/${file}`);

    res.status(200).json({
      desktop: pcImages,
      mobile: mobileImages
    });
  } catch (error) {
    console.error('Error reading image directories:', error);
    res.status(500).json({ 
      desktop: ['/pc/hero02.jpg'],
      mobile: ['/mobile/hero01.jpg']
    });
  }
}