export function removeVietnameseAccents(str){
    return str
    .normalize('NFD') //chuẩn hóa chuỗi về dạng tổ hợp
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}