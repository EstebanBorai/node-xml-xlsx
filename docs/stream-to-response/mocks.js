module.exports = {
	_mockFetchData() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					orderId: 10,
					address: 'Av. Corrientes 1368, C1043 CABA',
					postalCode: 'C1043',
					clientId: 8146,
					clientName: 'Beto Marquez',
					orderDate: new Date()
				});
			}, 2500);
		});
	},
}
