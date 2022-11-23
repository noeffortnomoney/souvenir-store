export const addToCart = (product) => {
	const cartStorage = JSON.parse(localStorage.getItem('cart'));

	let isHaveProduct = false;

	cartStorage.forEach((item) => {
		if (
			item.productId === product.productId &&
			JSON.stringify(item.variations) ===
				JSON.stringify(product.variations)
		) {
			item.quantity += 1;
			isHaveProduct = true;
			return;
		}
	});

	if (!isHaveProduct) {
		cartStorage.push(product);
	}
	localStorage.setItem('cart', JSON.stringify(cartStorage));
};

export const removeToCart = (product) => {
	let cartStorage = JSON.parse(localStorage.getItem('cart'));
	cartStorage.forEach((item) => {
		if (
			item.productId === product.productId &&
			JSON.stringify(item.variations) ===
				JSON.stringify(product.variations)
		) {
			if (item.quantity > 1) {
				item.quantity -= 1;
			} else {
				cartStorage = cartStorage.filter(
					(element) =>
						element.productId !== item.productId ||
						(element.productId === item.productId &&
							JSON.stringify(item.variations) !==
								JSON.stringify(element.variations))
				);
			}
		}
	});

	localStorage.setItem('cart', JSON.stringify(cartStorage));
};

export const deleteProductToCart = (product) => {
	let cartStorage = JSON.parse(localStorage.getItem('cart'));
	cartStorage.forEach((item) => {
		if (
			item.productId === product.productId &&
			JSON.stringify(item.variations) ===
				JSON.stringify(product.variations)
		) {
			cartStorage = cartStorage.filter(
				(element) =>
					element.productId !== item.productId ||
					(element.productId === item.productId &&
						JSON.stringify(item.variations) !==
							JSON.stringify(element.variations))
			);
		}
	});

	localStorage.setItem('cart', JSON.stringify(cartStorage));
};

export const getTotalCart = () => {
	const cartStorage = JSON.parse(localStorage.getItem('cart'));
	const totalCart = cartStorage.reduce(
		(total, item) => total + item.quantity * item.productPrice,
		0
	);
	return totalCart;
};

export const checkProductInCart = (productId) => {
	const cartStorage = JSON.parse(localStorage.getItem('cart'));

	return cartStorage.find((item) => item.productId === productId)
		? true
		: false;
};
