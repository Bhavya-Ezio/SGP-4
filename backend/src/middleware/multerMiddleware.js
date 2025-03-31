// import { S3Client } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';

// const s3 = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
// });

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: (req, file, cb) => {
//             cb(null, (req.user && "id" in req.user ? req.user.id : "") + '-' + file.originalname);
//         },
//     }),
// });

// export { upload };
//config multer
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploads (e.g., 'uploads/')
        cb(null, './src/uploads');
    },
    filename: (req, file, cb) => {
        // Use the original filename provided by the user
        cb(null, (req.user && "id" in req.user ? req.user.id : "") + "-" + file.originalname);
    }
});

export default multer({ storage });