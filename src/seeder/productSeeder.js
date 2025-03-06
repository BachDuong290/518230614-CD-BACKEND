import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";

const data = [
    {
        code: "MN_001",
        name: "Mặt Nạ L`Oreal ",
        price: 430.000,
        images: ["product6.png"],
        search: "mat na, mat na duong am",
        capacity: ["1 miếng"],
        size: ["S", "M", "L"],
        color: ["#FFCCFF","#FF9999", "#FF66CC"],
        active: true,
        description: "Mặt nạ L'Oreal Paris là một giải pháp giúp làn da thư giãn sau một ngày tiếp xúc với môi trường bên ngoài. ",
        information: "L'Oreal đã có mặt tại hơn 120 quốc gia cùng nhiều nhà máy sản xuất với quy trình nghiêm ngặt. Đem đến các giải pháp làm đẹp đa dạng, chất lượng và trở thành cái tên mà nhiều người tiêu dùng lựa chọn.Trong các sản phẩm chăm sóc da mặt thì mặt nạ L'Oreal Paris chính là bí quyết giúp da mặt được thư giãn và nuôi dưỡng làn da một cách trọn vẹn nhất. Sản phẩm này khi sử dụng, bạn hoàn toàn có thể nhận ra hiệu quả tức thì mà dòng mặt nạ của L'Oreal mang lại. L'Oreal với khả năng cung cấp các dưỡng chất và hấp thụ vượt trội, đem lại sức mạnh gấp 3 lần nhờ độ dưỡng ẩm chuyên sâu và phục hồi, cân bằng da, giúp bạn tạm biệt làn da thô ráp, bụi bẩn một cách hiệu quả.",
        categoryCode: "CSD_001",
        createAt: new Date(),
    },
    {
        code: "DG_001",
        name: "Dầu Gội L`Oreal ",
        price: 295.000,
        images: ["product7.png"],
        search: "dau goi, dau goi sieu muot",
        capacity: ["150ml", "250ml", "550ml"],
        size: ["S", "M", "L"],
        color: ["#FFCC66","#FFFF00", "#FFFF99"],
        active: true,
        description: "Dầu Gội Dưỡng Tóc Suôn Mượt Tóc Loreal Paris Extraordinary Oil Smooth Silicone-Free Shampoo có chứa các thành phần tự nhiên như 100% chiết xuất gỗ tuyết tùng; hỗ trợ cải thiện tình trạng tóc gãy rụng, khô xơ, mang đến một mái tóc suôn mượt và chắc khỏe hiệu quả.",
        information: "Mái tóc thể hiện niềm hạnh phúc và sức khỏe của bạn. Mái tóc còn được xem là một trong những điểm đầu tiên mà người đối diện chú ý đến bạn. Khi chăm sóc đúng cách, bạn hoàn toàn có thể sở hữu mái tóc bóng mượt và khỏe mạnh hơn. Với các mái tóc khô xơ, gãy rụng và chẻ ngọn, việc lựa chọn các loại dầu gội và dầu xả là một điều cần thiết. Các loại sản phẩm này sẽ hỗ trợ bạn cung cấp dưỡng chất cũng như phục hồi độ đàn hồi của mái tóc nhanh chóng",
        categoryCode: "CST_001",
        createAt: new Date(),
    },
    {
        code: "SM_001",
        name: "Son Môi L`Oreal ",
        price: 250.000,
        images: ["product12.png"],
        search: "son moi, son li",
        capacity: ["Khác"],
        size: ["S", "M", "L"],
        color: ["#FF3366","#FF3300", "#FF3333"],
        active: true,
        description: "Son Lì Dưỡng Môi L'Oreal Color Riche Moisture Matte không chỉ mang đến cho bạn những màu sắc thời trang nhất, mà khả năng giữ màu môi lâu phai cùng với khả năng dưỡng ẩm, bảo vệ môi tuyệt vời từ các tinh dầu quý đã chứng tỏ đây chính là thỏi son nên có trong giỏ xách của bất cứ phụ nữ nào.",
        information: "L'oreal Paris đã mang đến cho phái đẹp bộ sưu tập L'Oreal Color Riche Moisture Matte được chiết xuất từ tinh dầu Jojoba quý giá, có tác dụng dưỡng ẩm tuyệt vời và giúp đôi luôn mềm mại, quyến rũ. Không những có tác dụng dưỡng môi, những thỏi son môi đến từ thương hiệu L'oreal Paris còn ấn tượng với tông màu rực rỡ, tươi sáng cho bạn gái thêm phần quyến rũ, gợi cảm hơn bao giờ hết.",
        categoryCode: "TVS_001",
        createAt: new Date(),
    },
    {
        code: "CKD_001",
        name: "Che Khuyết Điểm L`Oreal ",
        price: 172.000,
        images: ["product14.png"],
        search: "che khuyet diem",
        capacity: ["Khác"],
        size: ["S", "M", "L"],
        color: ["#FFCC99","#FFCCCC", "#FFEBCD"],
        active: true,
        description: "Kem Che Khuyết Điểm L'Oreal Infallible Full Wear More Than Concealer 10ml đến từ thương hiệu đình đám L'Oréal Paris sẽ giúp hiệu chỉnh tông màu da, cùng với đầu tán cọ lớn sản phẩm sẽ che đi mọi khuyết điểm đồng thời giấu đi sự mệt mỏi, kém sắc trên làn da bạn.",
        information: "Kem Che Khuyết Điểm L'Oreal Infallible Full Wear More Than Concealer 10ml với công dụng kì diệu giúp bạn che đi các khuyết điểm của làn da như mụn đỏ, quầng thâm, các vết nám, rỗ, thậm chí là cả các vết sẹo nhỏ, kem che khuyết điểm giúp phái đẹp luôn có thể tự tin vì làn da của mình. Mức độ che phủ từ trung bình đến cao mang đến cho bạn gái lớp nền tự nhiên, hoàn hảo như làn da thật của bạn.",
        categoryCode: "TĐ_001",
        createAt: new Date(),
    },
]
export default async function categorySeeder() {
    await ProductModel.deleteMany()
    const categories = await CategoryModel.find()
    let writeProduct = []
    for(let product in data){
        const {categoryCode, ...dataOther} = data[product]
        const category = categories.find(categoriesItem => {
            return categoriesItem.code === categoryCode
        })
        writeProduct.push({
            categoryId: !!category ? category._id : null,
            ...dataOther
        })
    }
    await ProductModel.insertMany(writeProduct)
}