import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/product');
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.originalname.split('.')[0] +
				'_' +
				Date.now() +
				'.' +
				file.originalname.split('.')[1]
		);
	},
});

const upload = multer({ storage: storage });

export default upload;
