import express from "express";
import { listCategory, 
    renderPageCreateCategory, 
    createCategory, 
    renderPageUpdateCategory, 
    updateCategory,
    renderPageDeleteCategory, 
    deleteCategory, } 
    from "../../controllers/categoryController.js";

const router = express.Router();

router.get("/", listCategory)

router.get("/create", renderPageCreateCategory)  // render ra from create
router.post("/create", createCategory)

router.get("/update/:id", renderPageUpdateCategory)  // render ra from update
router.post("/update/:id", updateCategory)

router.get("/delete/:id", renderPageDeleteCategory)  // render ra from delete
router.post("/delete", deleteCategory)

export default router;

// vào app: khởi tạo ứng dụng node.js
// đọc: client gửi yêu cầu: đọc (request) -> categoryRouter (nhận request) -> categoryController(hàm -> xử lý request) -> categoryModel(lấy dữ liệu theo yêu cầu) -> views: listCategory(hthi lên gd)
// thêm: client gửi yêu cầu: thêm -> categoryRouter -> categoryController -> categoryModel -> kết nối mongoConnecter -> dô postman thêm dữ liệu, vào mongodb kt -> controller -> views: form
// sửa: client gửi yêu cầu: sửa -> categoryRouter -> categoryController -> categoryModel -> dô postman thêm dữ liệu, vào mongodb kt -> controller -> views: form
// xóa: client gửi yêu cầu: xóa -> categoryRouter -> categoryController -> categoryModel -> controller -> views: listCategory
// tìm kiếm: client gửi yêu cầu: tìm kiếm -> categoryRouter -> categoryController -> controller -> categoryModel -> hiện thị kết quả