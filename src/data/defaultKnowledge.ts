/**
 * ĐÂY LÀ KHO KIẾN THỨC MẶC ĐỊNH CỦA HỆ THỐNG.
 * Nội dung trong này sẽ được AI ghi nhớ vĩnh viễn cho tất cả người dùng.
 * Bạn hãy copy nội dung tài liệu của mình vào mảng dưới đây.
 */

import { Document } from '../services/geminiService';

export const DEFAULT_KNOWLEDGE: Document[] = [
  {
    id: 'default-1',
    title: 'Hướng dẫn chung về Công an phường Hạc Thành',
    content: 'Công an phường Hạc Thành là đơn vị thuộc Công an thành phố Thanh Hóa, có chức năng bảo đảm an ninh trật tự và thực hiện các thủ tục hành chính cho công dân trên địa bàn.'
  },
  {
    id: 'nd-154-tong-quan',
    title: 'Nghị định 154/2024/NĐ-CP - Quy định chung',
    content: 'Nghị định 154/2024/NĐ-CP quy định chi tiết Luật Cư trú về: Nơi cư trú của người lưu động trên phương tiện; người không có nơi thường trú/tạm trú; giấy tờ chứng minh chỗ ở hợp pháp và quan hệ nhân thân; đăng ký cư trú cho người chưa thành niên; xóa đăng ký cư trú; và quản lý Cơ sở dữ liệu về cư trú. Nghị định áp dụng cho cơ quan, tổ chức và công dân Việt Nam.'
  },
  {
    id: 'nd-154-cho-o-hop-phap',
    title: 'Giấy tờ chứng minh chỗ ở hợp pháp (Điều 5 Nghị định 154)',
    content: 'Giấy tờ chứng minh chỗ ở hợp pháp để đăng ký thường trú bao gồm: 1. Giấy chứng nhận quyền sử dụng đất, sở hữu nhà ở. 2. Giấy phép xây dựng. 3. Hợp đồng mua bán nhà ở (nhà nước hoặc doanh nghiệp). 4. Giấy tờ tặng cho, thừa kế, góp vốn nhà ở. 5. Giấy tờ tòa án/cơ quan nhà nước xác nhận sở hữu. 6. Xác nhận của UBND cấp xã về nhà ở ổn định, không tranh chấp (Mẫu số 02). 7. Hợp đồng thuê, mượn, ở nhờ có công chứng/chứng thực. Đối với đăng ký tạm trú, văn bản thuê/mượn/ở nhờ không bắt buộc công chứng.'
  },
  {
    id: 'nd-154-quan-he-nhan-than',
    title: 'Giấy tờ chứng minh quan hệ nhân thân (Điều 6 Nghị định 154)',
    content: 'Chứng minh quan hệ nhân thân (vợ, chồng, cha, mẹ, con, anh chị em...): 1. Khai thác qua Căn cước điện tử, định danh điện tử (VNeID), Cơ sở dữ liệu quốc gia về dân cư. 2. Nếu không khai thác được, sử dụng: Giấy đăng ký kết hôn, Giấy khai sinh, Quyết định nuôi con nuôi, Xác nhận của UBND cấp xã, Thẻ căn cước (thông tin mã hóa). Đối với người cao tuổi, người khuyết tật, người chưa thành niên: sử dụng Thẻ hội viên, Giấy xác nhận khuyết tật, Hộ chiếu, Sổ BHXH...'
  },
  {
    id: 'nd-154-nguoi-chua-thanh-nien',
    title: 'Đăng ký cư trú cho người chưa thành niên (Điều 7 Nghị định 154)',
    content: '1. Cha, mẹ hoặc người giám hộ thực hiện kê khai và xác nhận ý kiến vào Tờ khai thay đổi thông tin cư trú. 2. Trong tối đa 60 ngày kể từ khi khai sinh, phải làm thủ tục đăng ký thường trú/tạm trú cho trẻ. 3. Nếu cha mẹ không có nơi thường trú/tạm trú thì khai báo thông tin cư trú theo Điều 4. 4. Đăng ký lần đầu theo cha mẹ không cần xác minh tính hợp pháp của chỗ ở.'
  },
  {
    id: 'nd-154-xoa-dang-ky',
    title: 'Thủ tục xóa đăng ký thường trú và tạm trú (Điều 9, 10 Nghị định 154)',
    content: '1. Thời hạn: Trong 07 ngày kể từ khi phát sinh trường hợp xóa, người thuộc diện xóa hoặc đại diện hộ gia đình phải làm thủ tục. 2. Hồ sơ: Tờ khai thay đổi thông tin cư trú + giấy tờ chứng minh diện xóa. 3. Thời gian giải quyết: 05 ngày làm việc cho thường trú, 03 ngày làm việc cho tạm trú. 4. Nếu công dân không tự nguyện làm, cơ quan đăng ký cư trú sẽ kiểm tra, xác minh và tự thực hiện xóa.'
  },
  {
    id: 'nd-154-co-so-du-lieu',
    title: 'Cơ sở dữ liệu về cư trú (Chương III Nghị định 154)',
    content: 'Cơ sở dữ liệu về cư trú lưu trữ: Số hồ sơ cư trú, thông tin căn cước, nơi thường trú/tạm trú, tình trạng tạm vắng, nơi ở hiện tại, tiền án, tiền sự, lệnh truy nã... Dữ liệu được quản lý tập trung tại Bộ Công an, bảo đảm an ninh, an toàn thông tin và kết nối chia sẻ với Cơ sở dữ liệu quốc gia về dân cư.'
  },
  {
    id: 'vi-du-ct01-nhap-khau-vo',
    title: 'Ví dụ mẫu Tờ khai CT01 - Vợ nhập khẩu về với chồng',
    content: 'Mẫu CT01 (Thông tư 53/2025/TT-BCA) cho trường hợp vợ nhập khẩu về nhà chồng: 1. Người kê khai: PHẠM TRƯƠNG HÀ ANH (01/01/1996, Nữ, ĐDCN: 038196009581). 2. Chủ hộ: PHÙNG THỊ DƯƠNG (Mẹ chồng, ĐDCN: 038162006988). 3. Nội dung đề nghị: Đăng ký thường trú đến 01 Mai Hắc Đế, phường Hạc Thành, tỉnh Thanh Hóa. 4. Ý kiến đồng ý: Cần chữ ký đồng ý của Chủ hộ (Phùng Thị Dương) và Chủ sở hữu chỗ ở hợp pháp (Phùng Thị Dương) trực tiếp vào tờ khai hoặc xác nhận qua VNeID. Đây là mẫu chuẩn cho thủ tục nhập khẩu diện vợ về với chồng tại phường Hạc Thành.'
  },
  {
    id: 'vi-du-ct01-nhap-khau-con',
    title: 'Ví dụ mẫu Tờ khai CT01 - Nhập khẩu cho con',
    content: 'Mẫu CT01 (Thông tư 53/2025/TT-BCA) cho trường hợp nhập khẩu cho con mới sinh hoặc chưa có nơi thường trú: 1. Người thay đổi (con): PHẠM TRƯƠNG HÀ ANH (01/01/2026, Nữ, ĐDCN: 038326009581). 2. Người kê khai (Mẹ): PHÙNG THỊ DUNG. 3. Chủ hộ: PHÙNG THỊ DUNG (Mối quan hệ với người thay đổi: Mẹ - Con). 4. Nội dung đề nghị: Đăng ký thường trú đến 01 Mai Hắc Đế, phường Hạc Thành, tỉnh Thanh Hóa. 5. Ý kiến đồng ý: Vì người kê khai đồng thời là chủ hộ và mẹ đẻ, nên chỉ cần ký tên tại mục Người kê khai. Đây là hướng dẫn thực tế cho các gia đình tại phường Hạc Thành khi làm thủ tục cư trú cho con.'
  },
  {
    id: 'vi-du-ct01-dieu-chinh-thong-tin',
    title: 'Ví dụ mẫu Tờ khai CT01 - Điều chỉnh thông tin dân cư',
    content: 'Mẫu CT01 (Thông tư 53/2025/TT-BCA) cho trường hợp điều chỉnh thông tin trên Cơ sở dữ liệu quốc gia về dân cư: 1. Người kê khai: NGUYỄN VĂN TÙNG (01/01/1996, Nam, ĐDCN: 038096009581). 2. Chủ hộ: NGUYỄN VĂN TÙNG (Tự kê khai cho bản thân). 3. Nội dung đề nghị: Điều chỉnh tình trạng hôn nhân từ "Chưa kết hôn" thành "Đang có vợ" (Họ tên vợ: Mai Thị Loan). 4. Ý kiến đồng ý: Vì người kê khai đồng thời là chủ hộ, nên chỉ cần ký tên tại mục Người kê khai. Đây là mẫu chuẩn để công dân phường Hạc Thành cập nhật thông tin nhân thân chính xác trên hệ thống dữ liệu quốc gia.'
  },
  {
    id: 'vi-du-ct01-nhap-khau-chinh-chu',
    title: 'Ví dụ mẫu Tờ khai CT01 - Đăng ký thường trú về chỗ ở sở hữu của mình',
    content: 'Mẫu CT01 (Thông tư 53/2025/TT-BCA) cho trường hợp đăng ký thường trú vào nhà thuộc sở hữu cá nhân: 1. Người kê khai: NGUYỄN VĂN TÙNG (01/01/1996, Nam, ĐDCN: 038096009581). 2. Chủ hộ: NGUYỄN VĂN TÙNG. 3. Nội dung đề nghị: Đăng ký thường trú đến 01 Mai Thúc Loan, phường Hạc Thành, tỉnh Thanh Hóa. 4. Thành viên đi kèm: Mai Thị Loan (Vợ), Nguyễn Mai Anh (Con), Nguyễn Anh Tâm (Con). 5. Ý kiến đồng ý: Vì người kê khai là chủ sở hữu và chủ hộ, không cần xin ý kiến tại mục (3), (4). Đây là mẫu phổ biến cho các gia đình mới mua nhà hoặc chuyển về nhà riêng tại phường Hạc Thành.'
  },
  {
    id: 'luat-cu-tru-chuong-1-2',
    title: 'Luật Cư trú - Những quy định chung & Quyền, nghĩa vụ công dân',
    content: 'Luật Cư trú quy định về quyền tự do cư trú, đăng ký và quản lý cư trú. Giải thích từ ngữ quan trọng: Chỗ ở hợp pháp (nhà ở, tàu thuyền...), Cư trú (thường trú/tạm trú), Cơ quan đăng ký cư trú (Công an cấp xã). Các hành vi bị nghiêm cấm: Cản trở quyền tự do cư trú, hối lộ, làm giả giấy tờ, đăng ký khống (không sinh sống thực tế). Công dân có quyền lựa chọn nơi cư trú, được bảo mật thông tin và có nghĩa vụ đăng ký cư trú đầy đủ, chính xác.'
  },
  {
    id: 'luat-cu-tru-chuong-3',
    title: 'Luật Cư trú - Nơi cư trú (Điều 11-19)',
    content: 'Nơi cư trú gồm nơi thường trú và nơi tạm trú. Quy định cụ thể: 1. Người chưa thành niên: Nơi cư trú của cha mẹ. 2. Người được giám hộ: Nơi cư trú của người giám hộ. 3. Vợ chồng: Có thể cùng nơi cư trú hoặc khác nhau theo thỏa thuận. 4. Lực lượng vũ trang: Nơi đóng quân. 5. Người làm nghề lưu động (tàu thuyền): Nơi đăng ký phương tiện hoặc nơi đậu đỗ thường xuyên. 6. Người không có nơi thường trú/tạm trú: Nơi ở hiện tại (phải khai báo với Công an xã).'
  },
  {
    id: 'luat-cu-tru-chuong-4',
    title: 'Luật Cư trú - Đăng ký thường trú (Điều 20-26)',
    content: 'Điều kiện đăng ký thường trú: 1. Có chỗ ở hợp pháp thuộc sở hữu mình. 2. Chỗ ở không thuộc sở hữu nhưng được chủ hộ/chủ sở hữu đồng ý (quan hệ thân nhân: vợ chồng, cha mẹ con...). 3. Thuê, mượn, ở nhờ: Phải đủ diện tích tối thiểu (do tỉnh quy định, ít nhất 8m2/người). Hồ sơ gồm: Tờ khai CT01 + Giấy tờ chứng minh chỗ ở (đối với diện sở hữu/thuê) hoặc Giấy tờ chứng minh quan hệ nhân thân (đối với diện về ở với người thân). Thời hạn giải quyết: 07 ngày làm việc. Các trường hợp bị xóa thường trú: Chết, định cư nước ngoài, vắng mặt liên tục trên 12 tháng không khai báo.'
  },
  {
    id: 'luat-cu-tru-chuong-5',
    title: 'Luật Cư trú - Tạm trú, Lưu trú, Tạm vắng (Điều 27-31)',
    content: '1. Đăng ký tạm trú: Khi đến sinh sống ngoài nơi thường trú từ 30 ngày trở lên. Thời hạn tối đa 2 năm (gia hạn nhiều lần). Giải quyết trong 03 ngày làm việc. 2. Thông báo lưu trú: Khi có người đến ở lại dưới 30 ngày (phải thông báo trước 23h). 3. Khai báo tạm vắng: Bắt buộc với người đang bị quản lý (án treo, cải tạo...), người đi khỏi huyện trên 3 tháng (độ tuổi nghĩa vụ quân sự), hoặc đi khỏi nơi thường trú trên 12 tháng liên tục.'
  },
  {
    id: 'huong-dan-vneid-thuong-tru',
    title: 'Hướng dẫn nộp hồ sơ Đăng ký thường trú qua VNeID (Mức 2)',
    content: '1. Đăng nhập VNeID (Tài khoản mức 2). 2. Chọn "Thủ tục hành chính" -> "Đăng ký thường trú". 3. Nhập Passcode, chọn đối tượng (Bản thân/Khai hộ). 4. Chọn "Đăng ký thường trú lập hộ mới" hoặc "vào hộ đã có". 5. Nhập địa chỉ chi tiết (Thanh Hóa, Hạc Thành, số nhà...). 6. Chụp ảnh Tờ khai CT01 và giấy tờ nhà đất. 7. Quét mã QR nộp lệ phí. Hồ sơ sẽ tự động gửi đến Công an phường Hạc Thành. Theo dõi tại mục "Hồ sơ của tôi". Thời gian giải quyết: 07 ngày làm việc.'
  },
  {
    id: 'huong-dan-dvc-thuong-tru',
    title: 'Hướng dẫn nộp hồ sơ qua Cổng Dịch vụ công Bộ Công an',
    content: 'Dành cho người chưa có VNeID mức 2: 1. Truy cập dichvucong.bocongan.gov.vn. 2. Đăng nhập bằng tài khoản định danh điện tử. 3. Tìm kiếm "Đăng ký thường trú" -> "Nộp hồ sơ". 4. Chọn cơ quan thực hiện: Công an phường Hạc Thành. 5. Điền thông tin, đính kèm Tờ khai CT01 và giấy tờ chứng minh chỗ ở hợp pháp. 6. Chọn hình thức nhận kết quả và quét mã QR nộp lệ phí. Kết quả sẽ được cập nhật trên Cơ sở dữ liệu quốc gia về dân cư và hiển thị trên VNeID.'
  },
  {
    id: 'huong-dan-vneid-can-cuoc',
    title: 'Hướng dẫn đăng ký cấp thẻ Căn cước qua VNeID (Mức 2)',
    content: '1. Đăng nhập VNeID -> "Thủ tục hành chính" -> "Cấp, quản lý căn cước". 2. Nhập Passcode, chọn "Tạo mới yêu cầu" (Bản thân/Khai hộ). 3. Chọn lý do cấp (ví dụ: Cấp đổi CCCD sang Căn cước). 4. Chọn cấp thực hiện (Cấp Tỉnh hoặc Cấp Phường/Xã). 5. Chọn cơ quan thực hiện (ví dụ: Công an phường Hạc Thành - Hà Văn Nho). 6. Chọn ngày hẹn làm việc. 7. Cam đoan và gửi hồ sơ. Sau đó đến địa điểm hẹn để thu nhận vân tay, ảnh mặt.'
  },
  {
    id: 'huong-dan-dvc-can-cuoc',
    title: 'Hướng dẫn đăng ký cấp thẻ Căn cước qua Dịch vụ công (Mức 1)',
    content: '1. Truy cập dichvucong.bocongan.gov.vn. 2. Đăng nhập bằng VNeID. 3. Chọn "Nộp hồ sơ trực tuyến" -> Lĩnh vực "Cấp, quản lý căn cước". 4. Chọn thủ tục cần thực hiện -> "Nộp hồ sơ". 5. Nhập đầy đủ thông tin có dấu sao đỏ. 6. Chọn ngày đến thực hiện thủ tục và nộp hồ sơ. Sau khi hoàn thành, đến địa chỉ hẹn để thực hiện các bước thu nhận thẻ căn cước theo quy định.'
  },
  {
    id: 'ly-do-cap-can-cuoc',
    title: 'Các lý do cấp thẻ Căn cước thường gặp',
    content: '1. Cấp đổi CCCD gắn chíp sang thẻ Căn cước (khi đến thời hạn). 2. Cấp đổi khi đã có thẻ Căn cước (theo yêu cầu). 3. Cấp thẻ Căn cước bổ sung ảnh mặt và vân tay (nếu thẻ cũ thiếu). 4. Xác lập lại số định danh cá nhân.'
  },
  {
    id: 'huong-dan-thuong-tru-chi-tiet',
    title: 'Hướng dẫn Đăng ký thường trú chi tiết theo diện (Điều 20 Luật Cư trú)',
    content: '1. Nhà sở hữu: Tờ khai CT01 + Giấy tờ nhà đất (Sổ đỏ, Hợp đồng mua bán...). 2. Nhà thân nhân (Khoản 2 Điều 20): Chỉ cần Tờ khai CT01 + Giấy tờ chứng minh quan hệ (Kết hôn, Khai sinh) + Giấy tờ chứng minh diện người cao tuổi/khuyết tật (nếu có). KHÔNG yêu cầu giấy tờ chứng minh chỗ ở hợp pháp (Sổ đỏ/Sổ hồng) nhưng phải có sự đồng ý của chủ hộ và chủ sở hữu. 3. Thuê/Mượn/Ở nhờ: CT01 + Hợp đồng thuê/mượn (công chứng) + Giấy tờ chứng minh diện tích (>=8m2/người). 4. Cơ sở tôn giáo/trợ giúp xã hội: CT01 + Văn bản xác nhận của cơ sở + Xác nhận UBND xã. 5. Phương tiện lưu động: CT01 + Đăng ký phương tiện + Xác nhận nơi đậu đỗ. Nộp hồ sơ qua VNeID hoặc Cổng dịch vụ công.'
  },
  {
    id: 'huong-dan-tam-tru-chi-tiet',
    title: 'Hướng dẫn Đăng ký tạm trú chi tiết',
    content: 'Điều kiện: Sinh sống ngoài nơi thường trú từ 30 ngày trở lên. Hồ sơ: Tờ khai CT01 + Giấy tờ chứng minh chỗ ở hợp pháp (Hợp đồng thuê nhà, Sổ đỏ chủ nhà...). Thời hạn: Tối đa 2 năm, gia hạn trước 15 ngày khi hết hạn. Lưu ý: Không đăng ký tạm trú có thể bị phạt từ 500.000đ - 1.000.000đ. Nộp trực tuyến qua VNeID hoặc Cổng dịch vụ công.'
  },
  {
    id: 'huong-dan-tam-vang-luu-tru',
    title: 'Hướng dẫn Khai báo tạm vắng & Thông báo lưu trú',
    content: '1. Tạm vắng: Bắt buộc khi đi khỏi nơi thường trú trên 12 tháng (không đăng ký tạm trú nơi khác), người diện quản lý (án treo, tại ngoại...) đi khỏi xã 1 ngày, hoặc người độ tuổi NVQS đi khỏi huyện 3 tháng. Hồ sơ: Tờ khai CT01. 2. Lưu trú: Khi có người ở lại qua đêm hoặc dưới 30 ngày (người thân, bạn bè, khách thuê). Thời gian: Thông báo trước 23h ngày bắt đầu. Hình thức: Qua VNeID, Cổng dịch vụ công, gọi điện hoặc đến trực tiếp Công an phường.'
  },
  {
    id: 'huong-dan-xoa-thuong-tru',
    title: 'Thủ tục Xóa đăng ký thường trú',
    content: 'Các trường hợp xóa: Chết/mất tích; Định cư nước ngoài; Vắng mặt tại nơi thường trú trên 12 tháng không khai báo; Chấm dứt thuê/mượn nhà sau 12 tháng chưa có nơi ở mới; Bị phá dỡ nhà. Thủ tục: Nộp hồ sơ trực tuyến qua VNeID hoặc Cổng dịch vụ công.'
  },
  {
    id: 'luat-pccc-2024-tong-quan',
    title: 'Luật Phòng cháy, chữa cháy và cứu nạn, cứu hộ 2024 - Tổng quan',
    content: 'Luật số 55/2024/QH15 (có hiệu lực từ 01/07/2025) quy định về PCCC và cứu nạn, cứu hộ. Giải thích từ ngữ: 1. Cháy: Phản ứng hóa học tỏa nhiệt, phát sáng/khói gây thiệt hại. 2. Phòng cháy: Các biện pháp hạn chế nguyên nhân, nguy cơ cháy. 3. Chữa cháy: Các hoạt động dập tắt đám cháy, chống cháy lan. 4. Cứu nạn: Cứu người thoát khỏi nguy hiểm đe dọa tính mạng. 5. Cứu hộ: Cứu phương tiện, tài sản thoát khỏi nguy hiểm.'
  },
  {
    id: 'luat-pccc-2024-bao-chay',
    title: 'Báo cháy và số điện thoại khẩn cấp 114',
    content: '1. Số điện thoại báo cháy, cứu nạn, cứu hộ thống nhất toàn quốc là 114. 2. Người phát hiện cháy/tình huống cứu nạn phải báo ngay cho lực lượng PCCC, Công an hoặc UBND cấp xã gần nhất. 3. Thông tin báo bằng hiệu lệnh, điện thoại, thiết bị truyền tin báo cháy hoặc báo trực tiếp. 4. Mọi hành vi báo cháy giả, báo tình huống cứu nạn giả đều bị nghiêm cấm và xử lý nghiêm.'
  },
  {
    id: 'luat-pccc-2024-trach-nhiem',
    title: 'Trách nhiệm của cá nhân và hộ gia đình về PCCC',
    content: '1. Cá nhân: Chấp hành quy định, nội quy PCCC; tìm hiểu kiến thức, kỹ năng thoát nạn; bảo đảm an toàn khi sử dụng nguồn lửa, nguồn nhiệt; tham gia chữa cháy khi được huy động. 2. Chủ hộ gia đình: Thực hiện quy định an toàn PCCC cho nhà ở; tuyên truyền, nhắc nhở thành viên gia đình; thường xuyên kiểm tra, khắc phục nguy cơ cháy nổ; phối hợp với cơ quan chức năng khi có yêu cầu.'
  },
  {
    id: 'luat-pccc-2024-nha-o',
    title: 'Quy định PCCC đối với nhà ở và nhà ở kết hợp kinh doanh',
    content: '1. Nhà ở: Lắp đặt thiết bị điện an toàn; bố trí bếp nấu, nơi thờ cúng, đốt vàng mã bảo đảm khoảng cách an toàn; không để chất dễ cháy gần nguồn nhiệt; có phương tiện PCCC phù hợp và lối thoát nạn an toàn. 2. Nhà ở kết hợp sản xuất, kinh doanh: Phải có biển cấm/biển báo theo quy định; khu vực kinh doanh hàng nguy hiểm phải ngăn cách với khu vực để ở; không bố trí chỗ ngủ trong khu vực sản xuất, kinh doanh hàng nguy hiểm.'
  },
  {
    id: 'luat-pccc-2024-cam',
    title: 'Các hành vi bị nghiêm cấm trong PCCC và cứu nạn, cứu hộ',
    content: '1. Cố ý gây cháy, nổ, tai nạn hoặc xúi giục người khác gây cháy, nổ. 2. Xúc phạm, đe dọa, cản trở, chống đối lực lượng PCCC và cứu nạn, cứu hộ. 3. Lợi dụng nhiệm vụ PCCC để nhũng nhiễu, xâm phạm lợi ích nhà nước/công dân. 4. Làm giả kết quả thẩm định, nghiệm thu PCCC. 5. Báo cháy giả, báo tình huống cứu nạn giả. 6. Sản xuất, tàng trữ, vận chuyển, mua bán trái phép hàng hóa nguy hiểm về cháy, nổ.'
  },
  {
    id: 'tcvn-13967-thiet-ke-nha',
    title: 'TCVN 13967:2024 - Tiêu chuẩn thiết kế nhà ở riêng lẻ',
    content: 'Tiêu chuẩn quy định yêu cầu kỹ thuật cho nhà ở riêng lẻ (dưới 7 tầng, cao PCCC < 25m, khối tích < 5000m3). Các thông số chính: 1. Chiều cao thông thủy: Phòng ở >= 2,6m; Bếp/Vệ sinh >= 2,3m; Tầng hầm >= 2,0m. 2. Diện tích tối thiểu: Phòng ngủ đơn 9m2, phòng ngủ đôi 12m2, phòng khách 13m2, bếp 12m2, vệ sinh 3m2. 3. Cầu thang: Rộng vế thang >= 700mm, mặt bậc >= 250mm, cổ bậc <= 190mm. 4. An toàn: Cửa tầng trệt phải mở được từ bên trong dễ dàng, không dùng cửa cuốn cho lối thoát nạn duy nhất.'
  },
  {
    id: 'nd-106-2025-xu-phat-pccc',
    title: 'Nghị định 106/2025/NĐ-CP - Xử phạt vi phạm hành chính PCCC',
    content: 'Quy định mức phạt tiền tối đa: 50 triệu đồng với cá nhân, 100 triệu đồng với tổ chức. Các mức phạt điển hình: 1. Vi phạm quy định về tuyên truyền/huấn luyện: 300k - 8tr. 2. Không ban hành nội quy/biển báo: 1tr - 8tr. 3. Vi phạm về hồ sơ quản lý PCCC: 1tr - 7tr. 4. Sử dụng nguồn lửa, nguồn nhiệt trái quy định: 5tr - 25tr. 5. Lắp đặt, sử dụng điện không an toàn: 6tr - 40tr. 6. Cản trở lối thoát nạn, khóa cửa thoát nạn: 1tr - 50tr. 7. Báo cháy giả: 10tr - 15tr.'
  },
  {
    id: 'qcvn-10-2025-phuong-tien-pccc',
    title: 'QCVN 10:2025/BCA - Quy chuẩn phương tiện PCCC cho nhà ở',
    content: 'Quy định về trang bị, bố trí phương tiện PCCC: 1. Bình chữa cháy: Phải bố trí ở vị trí dễ thấy, dễ lấy, có màu đỏ; kiểm tra bảo dưỡng ít nhất 6 tháng/lần. 2. Hệ thống báo cháy: Phải kiểm tra ít nhất 1 lần/năm. 3. Lối thoát nạn: Phải có đèn chiếu sáng sự cố và chỉ dẫn thoát nạn (Exit) cho các nhà có quy mô lớn hoặc kết hợp kinh doanh. 4. Thiết bị bảo hộ: Khuyến khích trang bị mặt nạ lọc độc, dụng cụ phá dỡ thô sơ (rìu, xà beng, búa) tại lối ra ngoài.'
  },
  {
    id: 'qcvn-06-2022-sua-doi-2023',
    title: 'Sửa đổi 1:2023 QCVN 06:2022/BXD - An toàn cháy cho nhà',
    content: 'Cập nhật các yêu cầu khắt khe về ngăn cháy lan và thoát nạn: 1. Khoảng cách an toàn cháy giữa các nhà riêng lẻ tối thiểu 1,5m đến ranh giới đất. 2. Nhà có chiều cao PCCC trên 100m phải có tầng lánh nạn. 3. Các gian phòng có hạng nguy hiểm cháy nổ cao (gara xe, kho hàng) phải được ngăn cách bằng vách ngăn cháy giới hạn chịu lửa tối thiểu REI 45 hoặc EI 45. 4. Cầu thang bộ loại 2 (hở) trong nhà cao tầng phải có giải pháp ngăn khói từ các tầng.'
  }
];
