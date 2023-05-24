export const getInitialName = (nama_depan, nama_belakang) => {
	const initial = nama_depan?.charAt(0) + nama_belakang?.charAt(0);
	return initial.toUpperCase();
};