export const paymentMethod = (payment) => {
	switch (payment) {
		case 'cashdelivery':
			return 'Thanh toán khi nhận hàng';
		case 'card':
			return 'Thanh toán bằng tài khoản ngân hàng';
		case 'momo':
			return 'Thanh toán qua MoMo';
		case 'zalo':
			return 'Thanh toán qua Zalo Pay';
		default:
			return 'Lỗi thanh toán';
	}
};

export const statusValue = (status) => {
	switch (status) {
		case 'pending':
			return 'Đang chờ';
		case 'delivering':
			return 'Đang giao';
		case 'approved':
			return 'Đã giao';
		case 'cancel':
			return 'Đã hủy';
		default:
			return 'Không xác định';
	}
};
