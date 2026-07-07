// import React from 'react';
import { AVAILABLE_LANGUAGES } from './utils/langUtils';

const langCodeOptions = AVAILABLE_LANGUAGES.map(lang => ({ label: lang.label + ' (' + lang.code + ')', value: lang.code }));

import AdminHeaderHexagon from './components/admin.header';
import AdminHeroHexagon from './components/admin.hero';
import AdminGioiThieuHexagon from './components/admin.gioithieu';
import AdminDichVuHexagon from './components/admin.dichvu';
import AdminTinTucHexagon from './components/admin.tintuc';
import AdminDoiTacHexagon from './components/admin.doitac';
import AdminLienHeHexagon from './components/admin.lienhe';
import AdminFooterHexagon from './components/admin.footer';
import AdminGiaiPhapCongNghe from './components/admin.giaiphapcongnghe';
import AdminGiaiPhapNoiBat from './components/admin.giaiphapnoibat';
import AdminQuyTrinhThucHien from './components/admin.quytrinhthuchien';
import AdminCallToActionGiaiPhap from './components/admin.calltoaction';
import AdminChiTietBaiVietHexagon from './components/admin.chitietbaiviet';
import AdminHoatDongHexagon from './components/admin.hoatdong';
import AdminBreadcrumbHexagon from './components/admin.breadcrumb';
import AdminBaiVietLienQuanHexagon from './components/admin.baivietlienquan';




import GenericAdminBackgroundField from './components/admin.backgroundField';
import GenericImageField from './components/admin.inlineImage';
import ImageField from './components/admin.inlineImage';

//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    AdminChiTietBaiVietHexagon: {
      label: 'Hexagon Chi Tiết Bài Viết',
      defaultProps: {
        reverseLayout: false,
        sectionId: '',
        lang: 'vi',
        background: { type: 'color', color: '#f9fafb' },
        articleTitle: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
        articleTitleConfig: { color: '#111827', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        dateIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
        cardTitleHoverColor: '#f59e0b',
        date: '26 tháng 6, 2026',
        timeIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        time: '02:54',
        langIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>',
        dateConfig: { color: '#9ca3af', size: '14px' },
        contentBeforeImage: [
          { text: '<p>Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.</p>', textConfig: { color: '#374151', size: '18px' } }
        ],
        mainImage: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
        mainImageRadius: { type: 'all', all: '8px', tl: '0px', tr: '0px', bl: '0px', br: '0px' },
        contentAfterImage: [
          { text: '<p>Hòa chung không khí rực lửa, đại gia đình HHC đã cùng nhau tham gia các hoạt động tham quan, dã ngoại và tăng cường sự gắn kết tại vùng đảo xinh đẹp của Vinpearl Nha Trang. Tại đây, các thành viên cùng người thân đã được trải nghiệm những giây phút ý nghĩa, ấm áp và tận hưởng những giá trị xứng đáng.</p>', textConfig: { color: '#374151', size: '18px' } },
          { text: '<p>Teambuilding không chỉ là hoạt động để gắn kết tình đồng đội mà còn là dịp để toàn thể các đơn vị, tập thể, và cá nhân cùng nhau nhìn lại và tự hào về những thành tựu đã gặt hái, cũng như những khó khăn, trở ngại mà chúng ta đã cùng nhau vượt qua. Đây chính là bước đà hoàn hảo để chuẩn bị cho một sự khởi đầu trọn vẹn niềm vui, hứa hẹn một hành trình mới với nhiều thắng lợi hơn nữa!</p>', textConfig: { color: '#374151', size: '18px' } },
          { text: '<p>Tạm biệt Vinpearl Nha Trang với vô vàn kỷ niệm đẹp, chúng ta hãy cùng nhau mang nguồn năng lượng tích cực này trở lại công việc, tiếp tục đồng lòng, đoàn kết và vững bước tiến lên để chinh phục những mục tiêu lớn hơn.<br/><br/>HHC - Sẵn sàng bứt phá!</p>', textConfig: { color: '#374151', size: '18px' } },
          { text: '<p>#HexagonCorporation #SGD #Technology</p>', textConfig: { color: '#374151', size: '18px', weight: 'bold' } }
        ],
        showContactFooter: true,
        contactFooterContent: '<p><strong>𝐇𝐄𝐗𝐀𝐆𝐎𝐍 𝐂𝐎𝐑𝐏𝐎𝐑𝐀𝐓𝐈𝐎𝐍</strong></p><p>Address: 615 Au Co Str, Tan Phu Ward, HCMC</p><p>Hotline: +84 70 390 9333</p>',
        services: [
          {
            title: 'Giải pháp công nghệ',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: '<p>Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và địn...</p>',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg' }
          },
          {
            title: 'Giải pháp thi công & lắp đặt',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: '<p>Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững tro...</p>',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg' }
          },
          {
            title: 'Cung cấp thiết bị CNTT',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: '<p>Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu...</p>',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg' }
          },
          {
            title: 'Dịch vụ Công nghệ thông tin',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: '<p>Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh...</p>',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg' }
          }
        ]
      },
      fields: {
        reverseLayout: { type: 'radio', label: 'Vị trí Cột Nội dung', options: [{ label: 'Bên trái', value: false }, { label: 'Bên phải', value: true }] },
        sectionId: { type: 'text', label: 'ID Neo (vd: chi-tiet)' },
        lang: { type: 'select', label: 'Ngôn ngữ', options: langCodeOptions },
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        articleTitle: { type: 'text', label: 'Tiêu đề Bài viết' },
        articleTitleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        dateIconSvg: { type: 'textarea', label: 'SVG Icon Ngày' },
        date: { type: 'text', label: 'Ngày (VD: 28 tháng 8, 2028)' },
        timeIconSvg: { type: 'textarea', label: 'SVG Icon Giờ' },
        time: { type: 'text', label: 'Giờ (VD: 02:54)' },
        langIconSvg: { type: 'textarea', label: 'SVG Icon Ngôn ngữ' },
        dateConfig: {
          type: 'object', label: 'Cấu hình Ngày giờ',
          objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } }
        },
        contentBeforeImage: {
          type: 'array', label: 'Nội dung TRƯỚC hình ảnh',
          getItemSummary: (item) => 'Đoạn văn',
          arrayFields: {
            text: { type: 'richtext', label: 'Nội dung đoạn văn' },
            textConfig: { type: 'object', label: 'Cấu hình chữ', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } } }
          },
          defaultItemProps: { text: '<p>Nội dung mới</p>', textConfig: { color: '#374151', size: '18px' } }
        },
        mainImage: { type: 'custom', label: 'Hình ảnh chính', render: (props) => <GenericImageField {...props} /> },
        mainImageRadius: {
          type: 'object', label: 'Bo góc hình ảnh chính',
          objectFields: {
            type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Tuỳ chỉnh từng góc', value: 'custom' }] },
            all: { type: 'text', label: 'Bo 4 góc (VD: 8px)' },
            tl: { type: 'text', label: 'Góc trái trên' },
            tr: { type: 'text', label: 'Góc phải trên' },
            br: { type: 'text', label: 'Góc phải dưới' },
            bl: { type: 'text', label: 'Góc trái dưới' }
          }
        },
        contentAfterImage: {
          type: 'array', label: 'Nội dung SAU hình ảnh',
          getItemSummary: (item) => 'Đoạn văn',
          arrayFields: {
            text: { type: 'richtext', label: 'Nội dung đoạn văn' },
            textConfig: { type: 'object', label: 'Cấu hình chữ', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } } }
          },
          defaultItemProps: { text: '<p>Nội dung mới</p>', textConfig: { color: '#374151', size: '18px' } }
        },
        showContactFooter: { type: 'radio', label: 'Hiển thị thông tin liên hệ ở cuối?', options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] },
        contactFooterContent: { type: 'richtext', label: 'Nội dung Liên hệ' },
        services: {
          type: 'array', label: 'Danh sách Dịch vụ (Carousel Cột Phải)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề Dịch vụ' },
            titleConfig: { type: 'object', label: 'Cấu hình Tiêu đề', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } } },
            description: { type: 'richtext', label: 'Mô tả Dịch vụ' },
            descriptionConfig: { type: 'object', label: 'Cấu hình Mô tả', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } } },
            linkLabel: { type: 'text', label: 'Chữ link (VD: Tìm hiểu thêm)' },
            linkUrl: { type: 'text', label: 'Link dịch vụ' },
            linkConfig: { type: 'object', label: 'Cấu hình Link', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } } },
            background: { type: 'custom', label: 'Nền Dịch vụ', render: (props) => <GenericAdminBackgroundField {...props} /> }
          }
        }
      },
      render: (props) => <AdminChiTietBaiVietHexagon {...props} />
    },
    AdminHeaderHexagon: {
      label: 'Hexagon Header',
      defaultProps: {
        logoUrl: 'https://beta.hexagon.xyz/assets/images/logo-hhc.png',
        brandName: 'HEXAGON',
        brandNameConfig: { color: '#ffffff', size: '1.25rem', weight: 'bold', style: 'normal', decoration: 'none' },
        backgroundColor: { type: 'color', color: '#1A6B49' },
        hoverTextColor: '#F59E0B',
        menuItemsConfig: { color: '#D1D5DB', size: '1rem', weight: 'normal', style: 'normal', decoration: 'none' },
        mobileMenuBgColor: '#ffffff',
        mobileMenuItemsConfig: { color: '#1f2937', size: '1rem', weight: '500', style: 'normal', decoration: 'none' },
        langOptions: [
          { langCode: 'vi', label: 'VN', flagUrl: 'https://flagcdn.com/w20/vn.png' },
          { langCode: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w20/gb.png' }
        ],
        menuItems: [
          { label: 'Trang chủ', url: '#' },
          { label: 'Giới thiệu', url: '#' },
          { label: 'Dịch vụ', url: '#' },
          { label: 'Tin tức', url: '#' },
          { label: 'Liên hệ', url: '#' }
        ]
      },
      fields: {
        logoUrl: { type: 'custom', label: 'Logo', render: (props) => <GenericImageField {...props} /> },
        brandName: { type: 'text', label: 'Tên Thương hiệu', contentEditable: true },
        brandNameConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        backgroundColor: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        hoverTextColor: { type: 'text', label: 'Màu chữ khi Hover' },
        menuItemsConfig: {
          type: 'object', label: 'Định dạng Menu (Desktop)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        mobileMenuBgColor: { type: 'text', label: 'Màu nền Menu (Mobile)' },
        mobileMenuItemsConfig: {
          type: 'object', label: 'Định dạng Menu (Mobile)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        langOptions: {
          type: 'array',
          label: 'Các nút chọn Ngôn ngữ',
          arrayFields: {
            langCode: { type: 'select', label: 'Hệ thống xử lý (Mã NN)', options: langCodeOptions },
            flagUrl: { type: 'text', label: 'Link Icon Lá cờ (tuỳ chọn)' },
            label: { type: 'text', label: 'Tên nút (VN, EN,...)' }
          }
        },
        menuItems: {
          type: 'array', label: 'Menu Items',
          arrayFields: {
            label: { type: 'text', label: 'Tên', contentEditable: true },
            url: { type: 'text', label: 'Link' }
          }
        }
      },
      render: (props) => <AdminHeaderHexagon {...props} />
    },
    AdminHeroHexagon: {
      label: 'Hexagon Hero Banner',
      defaultProps: {
        sectionId: '',
        background: { type: 'color', color: '#1A6B49' },
        tagText: 'Công nghệ tương lai',
        tagConfig: {
          textColor: '#eab308', textSize: '14px', weight: 'bold', style: 'normal', decoration: 'none',
          background: { type: 'color', color: 'rgba(234, 179, 8, 0.1)' },
          border: { width: '1px', style: 'solid', color: 'rgba(234, 179, 8, 0.5)' },
          radius: { type: 'all', all: '9999px' }
        },
        title1Items: [{ text: 'Hệ sinh thái' }, { text: 'Cung cấp thiết bị CNTT' }],
        typingSpeed: '100',
        deletingSpeed: '50',
        pauseTime: '2000',
        title1Config: { color: '#ffffff', size: '60px', weight: 'bold', style: 'normal', decoration: 'none' },
        title2: 'HEXAGON Solutions',
        title2Config: { background: { type: 'gradient', gradientDirection: '135deg', gradientFrom: '#ffffff', gradientTo: '#F7931E' }, size: '60px', weight: 'bold', style: 'normal', decoration: 'none' },
        description: 'HEXAGON kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm đến cung cấp các giải pháp internet, thiết bị công nghệ thông tin, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
        descriptionConfig: { color: '#e5e7eb', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' },
        buttonsConfig: {
          textColor: '#ffffff', textSize: '16px', weight: 'bold', style: 'normal', decoration: 'none',
          background: { type: 'color', color: '#eab308' },
          border: { width: '0px', style: 'none', color: 'transparent' },
          radius: { type: 'all', all: '8px' }
        },
        buttons: [
          {
            label: 'Khám phá Dịch vụ', url: '#',
            btnConfig: {
              textColor: '#ffffff',
              background: { type: 'gradient', gradientDirection: 'to right', gradientFrom: '#ff9902', gradientTo: '#f2d337' },
              radius: { type: 'all', all: '8px' },
              boxShadow: '0 10px 15px -3px rgba(234,179,8,0.3)',
              customClass: 'hover:brightness-110'
            }
          },
          {
            label: 'Liên hệ Tư vấn', url: '#',
            btnConfig: {
              textColor: '#ffffff',
              background: { type: 'color', color: 'rgba(255,255,255,0.1)' },
              border: { width: '1px', style: 'solid', color: 'rgba(255,255,255,0.2)' },
              radius: { type: 'all', all: '8px' },
              customClass: 'hover:bg-white/20'
            }
          }
        ],
        scrollText: 'Cuộn xuống để khám phá',
        imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/globalmyc.webp'
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        background: { type: 'custom', label: 'Background', render: (props) => <GenericAdminBackgroundField {...props} /> },
        tagText: { type: 'text', label: 'Thẻ tag nhỏ', contentEditable: true },
        tagConfig: {
          type: 'object', label: 'Cấu hình Thẻ Tag',
          objectFields: {
            textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
            textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] },
            background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
            border: {
              type: 'object', label: 'Viền',
              objectFields: {
                width: { type: 'text', label: 'Độ dày (VD: 1px)' },
                style: { type: 'select', label: 'Kiểu viền', options: [{ label: 'Đường liền (solid)', value: 'solid' }, { label: 'Nét đứt (dashed)', value: 'dashed' }, { label: 'Không viền (none)', value: 'none' }] },
                color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
              }
            },
            radius: {
              type: 'object', label: 'Bo góc (Radius)',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo tất cả (VD: 8px, 9999px)' },
                tl: { type: 'text', label: 'Góc trên trái' },
                tr: { type: 'text', label: 'Góc trên phải' },
                bl: { type: 'text', label: 'Góc dưới trái' },
                br: { type: 'text', label: 'Góc dưới phải' }
              }
            },
            boxShadow: { type: 'text', label: 'Đổ bóng (Box Shadow)' },
            customClass: { type: 'text', label: 'Class Hover (VD: hover:brightness-110)' }
          }
        },
        title1Items: {
          type: 'array', label: 'Các dòng chữ đánh máy (Title 1)',
          arrayFields: { text: { type: 'text', label: 'Nội dung', contentEditable: true } }
        },
        typingSpeed: { type: 'text', label: 'Tốc độ gõ (ms) - VD: 100' },
        deletingSpeed: { type: 'text', label: 'Tốc độ xóa (ms) - VD: 50' },
        pauseTime: { type: 'text', label: 'Thời gian chờ trước khi xóa (ms) - VD: 2000' },
        title1Config: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        title2: { type: 'text', label: 'Tiêu đề 2', contentEditable: true },
        title2Config: {
          type: 'object', label: 'Cấu hình Tiêu đề 2 (HEXAGON Solutions)',
          objectFields: {
            background: { type: 'custom', label: 'Màu chữ (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        buttonsConfig: {
          type: 'object', label: 'Định dạng Nút chung',
          objectFields: {
            textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
            textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] },
            background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
            border: {
              type: 'object', label: 'Viền',
              objectFields: {
                width: { type: 'text', label: 'Độ dày (VD: 1px)' },
                style: { type: 'select', label: 'Kiểu viền', options: [{ label: 'Đường liền (solid)', value: 'solid' }, { label: 'Nét đứt (dashed)', value: 'dashed' }, { label: 'Không viền (none)', value: 'none' }] },
                color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
              }
            },
            radius: {
              type: 'object', label: 'Bo góc (Radius)',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo tất cả (VD: 8px, 9999px)' },
                tl: { type: 'text', label: 'Góc trên trái' },
                tr: { type: 'text', label: 'Góc trên phải' },
                bl: { type: 'text', label: 'Góc dưới trái' },
                br: { type: 'text', label: 'Góc dưới phải' }
              }
            },
            boxShadow: { type: 'text', label: 'Đổ bóng (Box Shadow)' },
            customClass: { type: 'text', label: 'Class Hover (VD: hover:brightness-110)' }
          }
        },
        buttons: {
          type: 'array', label: 'Nút hành động',
          arrayFields: {
            label: { type: 'text', label: 'Tên nút', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' },
            btnConfig: {
              type: 'object', label: 'Định dạng riêng (Tùy chọn)',
              objectFields: {
                textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
                textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] },
                background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
                border: {
                  type: 'object', label: 'Viền',
                  objectFields: {
                    width: { type: 'text', label: 'Độ dày (VD: 1px)' },
                    style: { type: 'select', label: 'Kiểu viền', options: [{ label: 'Đường liền (solid)', value: 'solid' }, { label: 'Nét đứt (dashed)', value: 'dashed' }, { label: 'Không viền (none)', value: 'none' }] },
                    color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
                  }
                },
                radius: {
                  type: 'object', label: 'Bo góc (Radius)',
                  objectFields: {
                    type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                    all: { type: 'text', label: 'Bo tất cả (VD: 8px, 9999px)' },
                    tl: { type: 'text', label: 'Góc trên trái' },
                    tr: { type: 'text', label: 'Góc trên phải' },
                    bl: { type: 'text', label: 'Góc dưới trái' },
                    br: { type: 'text', label: 'Góc dưới phải' }
                  }
                },
                boxShadow: { type: 'text', label: 'Đổ bóng (Box Shadow)' },
                customClass: { type: 'text', label: 'Class Hover (VD: hover:brightness-110)' }
              }
            }
          }
        },
        scrollText: { type: 'text', label: 'Chữ cuộn xuống', contentEditable: true },
        imageUrl: { type: 'custom', label: 'Hình ảnh Hero', render: (props) => <GenericImageField {...props} /> },
        imageAlt: { type: 'text', label: 'Mô tả hình ảnh' }
      },
      render: (props) => <AdminHeroHexagon {...props} />
    },
    AdminGioiThieuHexagon: {
      label: 'Hexagon Giới Thiệu',
      defaultProps: {
        sectionId: '',
        layout: 'imageLeft',
        imageBackground: { type: 'color', color: '#e3f7ed' },
        background: { type: 'color', color: '#ffffff' },
        title: 'Về Hexagon',
        titleConfig: { color: '#000000', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        description: 'Hexagon Corporation - Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
        descriptionConfig: { color: '#4b5563', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' },
        imageUrl: 'https://beta.hexagon.xyz/assets/images/VPX16.jpg',
        quoteText: 'Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^',
        quoteConfig: { color: '#111827', size: '16px', weight: 'normal', style: 'italic', decoration: 'none' },
        quoteAuthor: 'HEXAGON CULTURE',
        quoteAuthorConfig: { color: '#f59e0b', size: '14px', weight: 'bold', style: 'normal', decoration: 'none' },
        cardTitleConfig: { color: '#1D6A49', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
        cardDescConfig: { color: '#4b5563', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' },
        features: [
          { title: 'Sứ mệnh', description: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.', background: { type: 'color', color: '#f8fafc' }, titleConfig: { color: '#1D6A49', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' }, descriptionConfig: { color: '#4b5563', size: '14px' } },
          { title: 'Tầm nhìn', description: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.', background: { type: 'color', color: '#f8fafc' }, titleConfig: { color: '#1D6A49', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' }, descriptionConfig: { color: '#4b5563', size: '14px' } },
          { title: 'Giá trị cốt lõi', description: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.', background: { type: 'color', color: '#f8fafc' }, titleConfig: { color: '#1D6A49', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' }, descriptionConfig: { color: '#4b5563', size: '14px' } },
          { title: 'Nền tảng', description: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.', background: { type: 'color', color: '#f8fafc' }, titleConfig: { color: '#1D6A49', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' }, descriptionConfig: { color: '#4b5563', size: '14px' } }
        ]
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        layout: {
          type: 'radio',
          options: [
            { label: 'Ảnh trái, Chữ phải', value: 'imageLeft' },
            { label: 'Ảnh phải, Chữ trái', value: 'imageRight' }
          ]
        },

        background: { type: 'custom', label: 'Background', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        imageBackground: { type: 'custom', label: 'Nền ảnh (Nghiêng)', render: (props) => <GenericAdminBackgroundField {...props} /> },
        imageUrl: { type: 'custom', label: 'Hình ảnh', render: (props) => <GenericImageField {...props} /> },
        quoteText: { type: 'text', label: 'Quote', contentEditable: true },
        quoteConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        quoteAuthor: { type: 'text', label: 'Tác giả', contentEditable: true },
        quoteAuthorConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },

        features: {
          type: 'array', label: 'Các điểm nổi bật',
          defaultItemProps: {
            title: 'Tên tiêu đề',
            titleConfig: { color: '#1D6A49', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
            description: 'Mô tả chi tiết',
            descriptionConfig: { color: '#4b5563', size: '14px' }
          },
          arrayFields: {
            iconSvg: { type: 'textarea', label: 'Icon (Mã SVG)' },
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleConfig: {
              type: 'object', label: 'Cấu hình Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
              }
            },
            description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
            descriptionConfig: {
              type: 'object', label: 'Cấu hình Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }
              }
            }
          }
        }
      },
      render: (props) => <AdminGioiThieuHexagon {...props} />
    },
    AdminDichVuHexagon: {
      label: 'Hexagon Dịch Vụ',
      defaultProps: {
        sectionId: '',
        background: { type: 'color', color: '#f8fafc' },
        title: 'Dịch vụ nổi bật',
        titleConfig: { color: '#000000', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        description: 'Giải pháp đa dạng đáp ứng mọi nhu cầu.',
        descriptionConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' },
        serviceTitleConfig: { color: '#111827', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
        serviceDescConfig: { color: '#4b5563', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' },
        serviceLinkConfig: { color: '#1D6A49', size: '14px', weight: 'bold', style: 'normal', decoration: 'none' },
        services: [
          {
            title: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp.',
            linkLabel: 'Xem chi tiết →',
            linkUrl: '#',
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg', backgroundSize: 'cover' },
            hoverBackground: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png', backgroundSize: 'cover' },
            titleConfig: { color: '#f59e0b', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            descriptionConfig: { color: '#000000', size: '14px' },
            linkConfig: { color: '#2563eb', size: '14px', weight: 'bold' }
          },
          {
            title: 'Giải pháp thi công & lắp đặt',
            description: 'Cung cấp dịch vụ thi công hạ tầng mạng, lắp đặt camera an ninh chuyên nghiệp.',
            linkLabel: 'Xem chi tiết →',
            linkUrl: '#',
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg', backgroundSize: 'cover' },
            hoverBackground: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png', backgroundSize: 'cover' },
            titleConfig: { color: '#f59e0b', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            descriptionConfig: { color: '#000000', size: '14px' },
            linkConfig: { color: '#2563eb', size: '14px', weight: 'bold' }
          },
          {
            title: 'Cung cấp thiết bị CNTT',
            description: 'Đại lý phân phối các thiết bị công nghệ thông tin chính hãng từ các thương hiệu lớn.',
            linkLabel: 'Xem chi tiết →',
            linkUrl: '#',
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg', backgroundSize: 'cover' },
            hoverBackground: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png', backgroundSize: 'cover' },
            titleConfig: { color: '#f59e0b', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            descriptionConfig: { color: '#000000', size: '14px' },
            linkConfig: { color: '#2563eb', size: '14px', weight: 'bold' }
          },
          {
            title: 'Dịch vụ Công nghệ thông tin',
            description: 'Cung cấp nhân sự IT chất lượng cao, bảo trì hệ thống và chuyển đổi số.',
            linkLabel: 'Xem chi tiết →',
            linkUrl: '#',
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg', backgroundSize: 'cover' },
            hoverBackground: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png', backgroundSize: 'cover' },
            titleConfig: { color: '#f59e0b', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            descriptionConfig: { color: '#000000', size: '14px' },
            linkConfig: { color: '#2563eb', size: '14px', weight: 'bold' }
          }
        ]
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        background: { type: 'custom', label: 'Background', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        serviceTitleConfig: {
          type: 'object', label: 'Định dạng Tiêu đề DV',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        serviceDescConfig: {
          type: 'object', label: 'Định dạng Mô tả DV',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        serviceLinkConfig: {
          type: 'object', label: 'Định dạng Link DV',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        services: {
          type: 'array', label: 'Danh sách Dịch vụ',
          defaultItemProps: {
            title: 'Tên dịch vụ',
            titleConfig: { color: '#f59e0b', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            description: 'Mô tả chi tiết',
            descriptionConfig: { color: '#374151', size: '14px' },
            linkLabel: 'Xem chi tiết →',
            linkUrl: '#',
            linkConfig: { color: '#2563eb', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg' },
            hoverBackground: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/hovermyc-1-1782467371060-195987948.png' }
          },
          arrayFields: {
            background: { type: 'custom', label: 'Nền mặc định', render: (props) => <GenericAdminBackgroundField {...props} /> },
            hoverBackground: { type: 'custom', label: 'Nền khi Hover', render: (props) => <GenericAdminBackgroundField {...props} /> },
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleConfig: {
              type: 'object', label: 'Cấu hình Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
              }
            },
            description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
            descriptionConfig: {
              type: 'object', label: 'Cấu hình Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }
              }
            },
            linkLabel: { type: 'text', label: 'Chữ link (vd: Tìm hiểu thêm)', contentEditable: true },
            linkUrl: { type: 'text', label: 'Link URL' },
            linkConfig: {
              type: 'object', label: 'Cấu hình Link',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
              }
            }
          }
        }
      },
      render: (props) => <AdminDichVuHexagon {...props} />
    },
    AdminHoatDongHexagon: {
      label: 'Hexagon Hoạt Động',
      defaultProps: {
        reverseLayout: false,
        sectionId: '',
        background: { type: 'color', color: '#f9fafb' },
        title: 'Tin tức',
        titleConfig: { color: '#f59e0b', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        description: 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.',
        descConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' },
        lineColor: '#f59e0b',
        news: [
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            category: 'Hoạt động',
            categoryConfig: { color: '#f59e0b', backgroundColor: '#ffffff', border: '1px solid #f59e0b', size: '12px', weight: 'bold' },
            cardLogoText: 'Hexagon Corporation',
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùn...',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            titleLineClamp: 2,
            summary: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDI...',
            summaryConfig: { color: '#4b5563', size: '14px' },
            summaryLineClamp: 2,
            dateIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
            cardTitleHoverColor: '#f59e0b',
            date: '26 tháng 6, 2026',
            timeIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            time: '02:54',
            dateConfig: { color: '#9ca3af', size: '12px' },
            linkLabel: 'Xem thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b'
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            category: 'Hoạt động',
            categoryConfig: { color: '#f59e0b', backgroundColor: '#ffffff', border: '1px solid #f59e0b', size: '12px', weight: 'bold' },
            cardLogoText: '',
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            titleLineClamp: 2,
            summary: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại...',
            summaryConfig: { color: '#4b5563', size: '14px' },
            summaryLineClamp: 2,
            dateIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
            cardTitleHoverColor: '#f59e0b',
            date: '26 tháng 6, 2026',
            timeIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            time: '01:25',
            dateConfig: { color: '#9ca3af', size: '12px' },
            linkLabel: 'Xem thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b'
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            category: 'Sự kiện',
            categoryConfig: { color: '#f59e0b', backgroundColor: '#ffffff', border: '1px solid #f59e0b', size: '12px', weight: 'bold' },
            cardLogoText: '',
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            titleLineClamp: 2,
            summary: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để ch...',
            summaryConfig: { color: '#4b5563', size: '14px' },
            summaryLineClamp: 2,
            dateIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
            cardTitleHoverColor: '#f59e0b',
            date: '26 tháng 6, 2026',
            timeIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            time: '01:00',
            dateConfig: { color: '#9ca3af', size: '12px' },
            linkLabel: 'Xem thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b'
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            category: 'Tin tức',
            categoryConfig: { color: '#f59e0b', backgroundColor: '#ffffff', border: '1px solid #f59e0b', size: '12px', weight: 'bold' },
            cardLogoText: '',
            title: 'Bài viết 4',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            titleLineClamp: 2,
            summary: 'Bài viết 4',
            summaryConfig: { color: '#4b5563', size: '14px' },
            summaryLineClamp: 2,
            dateIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
            date: '25 tháng 8, 2028',
            timeIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            time: '18:58',
            dateConfig: { color: '#9ca3af', size: '12px' },
            linkLabel: 'Xem thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b'
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            category: 'Tin tức',
            categoryConfig: { color: '#f59e0b', backgroundColor: '#ffffff', border: '1px solid #f59e0b', size: '12px', weight: 'bold' },
            cardLogoText: '',
            title: 'Bài viết 5',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            titleLineClamp: 2,
            summary: 'Bài viết 5',
            summaryConfig: { color: '#4b5563', size: '14px' },
            summaryLineClamp: 2,
            dateIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
            date: '25 tháng 8, 2028',
            timeIconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            time: '',
            dateConfig: { color: '#9ca3af', size: '12px' },
            linkLabel: 'Xem thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b'
          }
        ],
        services: [
          {
            title: 'Giải pháp công nghệ',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và địn...',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg' }
          },
          {
            title: 'Giải pháp thi công & lắp đặt',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững tro...',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg' }
          },
          {
            title: 'Cung cấp thiết bị CNTT',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu...',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg' }
          },
          {
            title: 'Dịch vụ Công nghệ thông tin',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold' },
            description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh...',
            descriptionConfig: { color: '#4b5563', size: '14px' },
            linkLabel: 'Tìm hiểu thêm',
            linkUrl: '#',
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            background: { type: 'image', imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg' }
          }
        ]
      },
      fields: {
        reverseLayout: { type: 'radio', label: 'Vị trí Cột Nội dung', options: [{ label: 'Bên trái', value: false }, { label: 'Bên phải', value: true }] },
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 36px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả' },
        descConfig: {
          type: 'object', label: 'Cấu hình Mô tả',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        lineColor: { type: 'text', label: 'Màu gạch chân (VD: #f59e0b)' },
        news: {
          type: 'array', label: 'Danh sách Bài viết',
          arrayFields: {
            imageUrl: { type: 'custom', label: 'Hình ảnh Bài viết', render: (props) => <GenericImageField {...props} /> },
            category: { type: 'text', label: 'Thẻ tag (VD: Tin tức)' },
            categoryConfig: {
              type: 'object', label: 'Cấu hình thẻ tag',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, backgroundColor: { type: 'text', label: 'Màu nền' }, border: { type: 'text', label: 'Viền' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } }
            },
            cardLogoText: { type: 'text', label: 'Chữ chìm trên ảnh' },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            titleConfig: {
              type: 'object', label: 'Cấu hình Tiêu đề',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } }
            },
            titleLineClamp: { type: 'number', label: 'Số dòng hiển thị tiêu đề' },
            summary: { type: 'richtext', label: 'Tóm tắt bài viết' },
            summaryConfig: {
              type: 'object', label: 'Cấu hình Tóm tắt',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } }
            },
            summaryLineClamp: { type: 'number', label: 'Số dòng hiển thị tóm tắt' },
            dateIconSvg: { type: 'textarea', label: 'SVG Icon Ngày' },
            date: { type: 'text', label: 'Ngày (VD: 28 tháng 8, 2028)' },
            timeIconSvg: { type: 'textarea', label: 'SVG Icon Giờ' },
            time: { type: 'text', label: 'Giờ (VD: 02:54)' },
            dateConfig: {
              type: 'object', label: 'Cấu hình Ngày giờ',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } }
            },
            linkLabel: { type: 'text', label: 'Chữ link (VD: Xem thêm)' },
            linkUrl: { type: 'text', label: 'Link bài viết' },
            linkConfig: {
              type: 'object', label: 'Cấu hình Link',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } }
            },
            hoverBorderColor: { type: 'text', label: 'Màu viền khi hover (VD: #f59e0b)' },
            hoverTitleColor: { type: 'text', label: 'Màu tiêu đề khi hover (VD: #f59e0b)' }
          }
        },
        services: {
          type: 'array', label: 'Danh sách Dịch vụ (Carousel)',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề Dịch vụ' },
            titleConfig: {
              type: 'object', label: 'Cấu hình Tiêu đề',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } }
            },
            description: { type: 'richtext', label: 'Mô tả Dịch vụ' },
            descriptionConfig: {
              type: 'object', label: 'Cấu hình Mô tả',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } }
            },
            linkLabel: { type: 'text', label: 'Chữ link (VD: Tìm hiểu thêm)' },
            linkUrl: { type: 'text', label: 'Link dịch vụ' },
            linkConfig: {
              type: 'object', label: 'Cấu hình Link',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] } }
            },
            background: { type: 'custom', label: 'Nền Dịch vụ', render: (props) => <GenericAdminBackgroundField {...props} /> }
          }
        }
      },
      render: (props) => <AdminHoatDongHexagon {...props} />
    },
    AdminTinTucHexagon: {
      label: 'Hexagon Tin Tức',
      defaultProps: {
        sectionId: '',
        background: { type: 'color', color: '#ffffff' },
        title: 'Tin tức',
        titleConfig: { color: '#000000', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        description: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
        descriptionConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' },
        buttons: [
          {
            label: 'Xem tất cả bài viết >',
            url: '#',
            background: { type: 'gradient', gradient: 'linear-gradient(to right, #008374, #89BA16)' },
            hoverBackground: { type: 'gradient', gradient: 'linear-gradient(to right, #007164, #78A614)' }
          }
        ],
        news: [
          {
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
            summary: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra...',
            date: '26 thg 6, 2026',
            dateIconSvg: '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            cardWidth: 'auto',
            linkUrl: '#',
            linkLabel: 'Xem chi tiết →',
            titleLineClamp: 2,
            summaryLineClamp: 2,
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            summaryConfig: { color: '#4b5563', size: '14px' },
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            dateConfig: { color: '#9ca3af', size: '12px' }
          },
          {
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            summary: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến tron...',
            date: '26 thg 6, 2026',
            dateIconSvg: '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            cardWidth: 'auto',
            linkUrl: '#',
            linkLabel: 'Xem chi tiết →',
            titleLineClamp: 2,
            summaryLineClamp: 2,
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            summaryConfig: { color: '#4b5563', size: '14px' },
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            dateConfig: { color: '#9ca3af', size: '12px' }
          },
          {
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            summary: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé \'Lục Giác\' để chọn cho m...',
            date: '26 thg 6, 2026',
            dateIconSvg: '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            cardWidth: 'auto',
            linkUrl: '#',
            linkLabel: 'Xem chi tiết →',
            titleLineClamp: 2,
            summaryLineClamp: 2,
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            summaryConfig: { color: '#4b5563', size: '14px' },
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            dateConfig: { color: '#9ca3af', size: '12px' }
          },
          {
            title: 'Bài viết 4',
            summary: 'Bài viết 4',
            date: '25 thg 6, 2026',
            dateIconSvg: '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            cardWidth: 'auto',
            linkUrl: '#',
            linkLabel: 'Xem chi tiết →',
            titleLineClamp: 2,
            summaryLineClamp: 2,
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            summaryConfig: { color: '#4b5563', size: '14px' },
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            dateConfig: { color: '#9ca3af', size: '12px' }
          },
          {
            title: 'Bài viết 5',
            summary: 'Bài viết 5',
            date: '25 thg 6, 2026',
            dateIconSvg: '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            cardWidth: 'auto',
            linkUrl: '#',
            linkLabel: 'Xem chi tiết →',
            titleLineClamp: 2,
            summaryLineClamp: 2,
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            summaryConfig: { color: '#4b5563', size: '14px' },
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            dateConfig: { color: '#9ca3af', size: '12px' }
          }
        ]
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        background: { type: 'custom', label: 'Background', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        buttons: {
          type: 'array', label: 'Danh sách Nút ở dưới',
          defaultItemProps: {
            label: 'Xem tất cả bài viết >',
            url: '#',
            background: { type: 'gradient', gradient: 'linear-gradient(to right, #008374, #89BA16)' },
            hoverBackground: { type: 'gradient', gradient: 'linear-gradient(to right, #007164, #78A614)' }
          },
          arrayFields: {
            label: { type: 'text', label: 'Chữ nút' },
            url: { type: 'text', label: 'Link URL' },
            background: { type: 'custom', label: 'Nền nút', render: (props) => <GenericAdminBackgroundField {...props} /> },
            hoverBackground: { type: 'custom', label: 'Nền nút khi Hover', render: (props) => <GenericAdminBackgroundField {...props} /> }
          }
        },
        news: {
          type: 'array', label: 'Danh sách Tin tức',
          defaultItemProps: {
            title: 'Tên bài viết mới',
            summary: 'Mô tả ngắn gọn',
            date: '01/01/2026',
            dateIconSvg: '<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            cardWidth: 'auto',
            linkUrl: '#',
            linkLabel: 'Xem chi tiết →',
            titleLineClamp: 2,
            summaryLineClamp: 2,
            hoverBorderColor: '#f59e0b',
            hoverTitleColor: '#f59e0b',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold' },
            summaryConfig: { color: '#4b5563', size: '14px' },
            linkConfig: { color: '#f59e0b', size: '14px', weight: 'bold' },
            dateConfig: { color: '#9ca3af', size: '12px' }
          },
          arrayFields: {
            cardWidth: {
              type: 'select', label: 'Độ rộng thẻ',
              options: [
                { label: 'Tự động (50% trên, 33% dưới)', value: 'auto' },
                { label: '50% (1/2 hàng)', value: '50' },
                { label: '33% (1/3 hàng)', value: '33' },
                { label: '100% (cả hàng)', value: '100' }
              ]
            },
            imageUrl: { type: 'custom', label: 'Hình ảnh', render: (props) => <GenericImageField {...props} /> },
            category: { type: 'text', label: 'Danh mục (vd: Sự kiện)' },
            dateIconSvg: { type: 'textarea', label: 'Icon Ngày tháng (Mã SVG)' },
            date: { type: 'text', label: 'Ngày đăng (vd: 26 thg 6, 2026)' },
            dateConfig: {
              type: 'object', label: 'Cấu hình Ngày đăng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' }
              }
            },
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleLineClamp: { type: 'number', label: 'Số dòng Tiêu đề trước khi 3 chấm (0: không giới hạn)' },
            hoverTitleColor: { type: 'text', label: 'Mã màu chữ Tiêu đề khi Hover (VD: #f59e0b)' },
            titleConfig: {
              type: 'object', label: 'Cấu hình Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
              }
            },
            summary: { type: 'richtext', label: 'Mô tả ngắn', contentEditable: true },
            summaryLineClamp: { type: 'number', label: 'Số dòng Mô tả trước khi 3 chấm (0: không giới hạn)' },
            summaryConfig: {
              type: 'object', label: 'Cấu hình Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' }
              }
            },
            linkLabel: { type: 'text', label: 'Chữ link' },
            linkUrl: { type: 'text', label: 'Link bài viết' },
            linkConfig: {
              type: 'object', label: 'Cấu hình Link',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
              }
            },
            background: { type: 'custom', label: 'Nền thẻ', render: (props) => <GenericAdminBackgroundField {...props} /> },
            hoverBorderColor: { type: 'text', label: 'Mã màu viền thẻ khi Hover (VD: #f59e0b)' }
          }
        }
      },
      render: (props) => <AdminTinTucHexagon {...props} />
    },
    AdminDoiTacHexagon: {
      label: 'Hexagon Đối Tác',
      defaultProps: {
        sectionId: '',
        background: { type: 'gradient', gradientDirection: 'to bottom', gradientFrom: '#0f826b', gradientTo: '#86efac' },
        title: 'Các đối tác liên kết',
        titleConfig: { color: '#ffffff', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        scroll: { direction: 'left', speed: '20s' },
        logos: [
          { name: 'COMOON', type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi E.png', svgCode: '' },
          { name: 'Khối C', type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi C.png', svgCode: '' },
          { name: 'Khối D', type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi D.png', svgCode: '' },
          { name: 'Happy Food', type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/Happy Food.png', svgCode: '' },
          { name: 'Khối F', type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi F.png', svgCode: '' }
        ]
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        background: { type: 'custom', label: 'Background', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        scroll: {
          type: 'object', label: 'Hiệu ứng cuộn',
          objectFields: {
            direction: { type: 'select', label: 'Chiều cuộn', options: [{ label: 'Phải sang trái', value: 'left' }, { label: 'Trái sang phải', value: 'right' }] },
            speed: { type: 'text', label: 'Tốc độ (VD: 20s, 15s)' }
          }
        },
        logos: {
          type: 'array', label: 'Danh sách Logo',
          arrayFields: {
            name: { type: 'text', label: 'Tên đối tác', contentEditable: true },
            type: { type: 'select', label: 'Loại hiển thị', options: [{ label: 'Hình ảnh', value: 'image' }, { label: 'SVG', value: 'svg' }] },
            imageUrl: { type: 'custom', label: 'Hình ảnh Logo', render: (props) => <GenericImageField {...props} /> },
            svgCode: { type: 'textarea', label: 'Mã SVG' }
          }
        }
      },
      render: (props) => <AdminDoiTacHexagon {...props} />
    },
    AdminLienHeHexagon: {
      label: 'Hexagon Liên Hệ',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        layoutMode: {
          type: 'select', label: 'Chế độ hiển thị',
          options: [{ label: 'Bản đồ Full màn hình', value: 'full_map' }, { label: 'Chữ + Bản đồ', value: 'text_map' }]
        },
        mapLayout: {
          type: 'select', label: 'Vị trí Layout (Chỉ dùng cho Chế độ Chữ + Bản đồ)',
          options: [{ label: 'Chữ Trái - Bản đồ Phải', value: 'text_left' }, { label: 'Bản đồ Trái - Chữ Phải', value: 'map_left' }]
        },
        background: {
          type: 'custom', label: 'Background (Chỉ dùng cho Chế độ Chữ + Bản đồ)',
          render: (props) => <GenericAdminBackgroundField {...props} />
        },
        iframeCode: { type: 'textarea', label: 'Mã nhúng (Iframe) từ Google Maps' },
        mapRadius: {
          type: 'object', label: 'Bo góc bản đồ',
          objectFields: {
            type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
            all: { type: 'text', label: 'Bo đều (vd: 16px)' },
            tl: { type: 'text', label: 'Trái-Trên' },
            tr: { type: 'text', label: 'Phải-Trên' },
            br: { type: 'text', label: 'Phải-Dưới' },
            bl: { type: 'text', label: 'Trái-Dưới' }
          }
        },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        descConfig: {
          type: 'object', label: 'Cấu hình Mô tả',
          objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' } }
        },
        titleConfig: {
          type: 'object', label: 'Định dạng Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả ngắn' },
        descriptionConfig: {
          type: 'object', label: 'Định dạng Mô tả',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
          }
        },
        contactItems: {
          type: 'array', label: 'Thông tin liên hệ',
          arrayFields: {
            iconSvg: { type: 'textarea', label: 'Mã SVG của Icon' },
            iconStyle: {
              type: 'object', label: 'Định dạng Icon',
              objectFields: {
                color: { type: 'text', label: 'Màu Icon' },
                bgColor: { type: 'text', label: 'Màu nền' },
                borderColor: { type: 'text', label: 'Màu viền' },
                borderWidth: { type: 'text', label: 'Độ dày viền (vd: 1px)' },
                radius: {
                  type: 'object', label: 'Bo góc Icon',
                  objectFields: {
                    type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
                    all: { type: 'text', label: 'Bo đều (vd: 50%)' },
                    tl: { type: 'text', label: 'Trái-Trên' },
                    tr: { type: 'text', label: 'Phải-Trên' },
                    br: { type: 'text', label: 'Phải-Dưới' },
                    bl: { type: 'text', label: 'Trái-Dưới' }
                  }
                }
              }
            },
            title: { type: 'text', label: 'Tiêu đề phụ' },
            titleConfig: {
              type: 'object', label: 'Định dạng Tiêu đề phụ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
              }
            },
            content: { type: 'richtext', label: 'Nội dung liên hệ' },
            contentConfig: {
              type: 'object', label: 'Định dạng Nội dung',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
              }
            }
          },
          defaultItemProps: {
            iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
            iconStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '50%' } },
            title: 'Trụ sở chính',
            titleConfig: { color: '#111827', size: '16px', weight: 'bold' },
            content: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
            contentConfig: { color: '#4b5563', size: '16px', weight: 'normal' }
          },
          getItemSummary: (item) => item.title || 'Liên hệ mới'
        },
        socialItems: {
          type: 'array', label: 'Mạng xã hội',
          arrayFields: {
            label: { type: 'text', label: 'Tên MXH' },
            url: { type: 'text', label: 'Đường dẫn liên kết (Link)' },
            iconSvg: { type: 'textarea', label: 'Mã SVG của Icon (Để trống nếu không dùng)' },
            buttonStyle: {
              type: 'object', label: 'Định dạng Nút',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                bgColor: { type: 'text', label: 'Màu nền' },
                borderColor: { type: 'text', label: 'Màu viền' },
                borderWidth: { type: 'text', label: 'Độ dày viền (vd: 1px)' },
                radius: {
                  type: 'object', label: 'Bo góc Nút',
                  objectFields: {
                    type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
                    all: { type: 'text', label: 'Bo đều (vd: 20px)' },
                    tl: { type: 'text', label: 'Trái-Trên' },
                    tr: { type: 'text', label: 'Phải-Trên' },
                    br: { type: 'text', label: 'Phải-Dưới' },
                    bl: { type: 'text', label: 'Trái-Dưới' }
                  }
                }
              }
            }
          },
          defaultItemProps: {
            label: 'Facebook',
            url: '#',
            iconSvg: '',
            buttonStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '16px' } }
          },
          getItemSummary: (item) => item.label || 'MXH mới'
        }
      },
      resolveFields: (data, { fields }) => {
        if (data.props.layoutMode === 'full_map') {
          return {
            layoutMode: fields.layoutMode,
            iframeCode: fields.iframeCode,
            mapRadius: fields.mapRadius
          };
        }
        return fields;
      },
      defaultProps: {
        sectionId: '',
        layoutMode: 'text_map',
        mapLayout: 'text_left',
        background: { type: 'color', color: '#ffffff' },
        iframeCode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.335639186876!2d106.64154975!3d10.78558485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eb1e788c803%3A0x3d042f508943f99!2zNjE1IMOCdSBDxqEsIFTDom4gUGjDuiwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1783311179966!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`,
        mapRadius: { type: 'all', all: '16px' },
        title: 'Liên hệ với chúng tôi',
        titleConfig: { color: '#111827', size: '36px', weight: 'bold' },
        description: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
        descriptionConfig: { color: '#4b5563', size: '16px', weight: 'normal' },
        contactItems: [
          {
            iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
            iconStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '50%' } },
            title: 'Trụ sở chính',
            titleConfig: { color: '#111827', size: '16px', weight: 'bold' },
            content: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
            contentConfig: { color: '#4b5563', size: '16px', weight: 'normal' }
          },
          {
            iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
            iconStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '50%' } },
            title: 'Email',
            titleConfig: { color: '#111827', size: '16px', weight: 'bold' },
            content: 'info@hexagon.xyz',
            contentConfig: { color: '#4b5563', size: '16px', weight: 'normal' }
          },
          {
            iconSvg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>',
            iconStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '50%' } },
            title: 'Hotline',
            titleConfig: { color: '#111827', size: '16px', weight: 'bold' },
            content: '096 446 0333',
            contentConfig: { color: '#4b5563', size: '16px', weight: 'normal' }
          }
        ],
        socialItems: [
          { label: 'Facebook', url: '#', iconSvg: '', buttonStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '16px' } } },
          { label: 'LinkedIn', url: '#', iconSvg: '', buttonStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '16px' } } },
          { label: 'YouTube', url: '#', iconSvg: '', buttonStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '16px' } } },
          { label: 'Zalo', url: '#', iconSvg: '', buttonStyle: { color: '#00695c', bgColor: '#e0f2f1', borderColor: 'transparent', borderWidth: '0px', radius: { type: 'all', all: '16px' } } }
        ]
      },
      render: (props) => <AdminLienHeHexagon {...props} />
    },


    AdminGiaiPhapCongNghe: {
      label: 'Hexagon Giải pháp - Phần Đầu',
      defaultProps: {
        sectionId: '', background: { type: 'color', color: '#F8FAFC' },
        layoutOptions: 'textLeft',
        title: 'Giải pháp công nghệ',
        titleConfig: { color: '#F59E0B', size: '48px', weight: 'bold', style: 'normal', decoration: 'none' },
        descriptions: [{ text: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.' }],
        descConfig: { color: '#4B5563', size: '16px' },
        buttons: [{ label: 'Liên hệ tư vấn', url: '#', config: { textColor: '#ffffff', textSize: '16px', weight: 'bold', style: 'normal', decoration: 'none', background: { type: 'color', color: '#f59e0b' }, hoverBackground: { color: '#d97706' }, radius: { type: 'all', all: '8px' } } }],
        imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg'
      },
      fields: {
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        layoutOptions: { type: 'radio', label: 'Bố cục', options: [{ label: 'Chữ trái - Ảnh phải', value: 'textLeft' }, { label: 'Ảnh trái - Chữ phải', value: 'imageLeft' }] },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        descConfig: {
          type: 'object', label: 'Cấu hình Mô tả',
          objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' } }
        },
        descriptions: { type: 'array', label: 'Các đoạn mô tả', arrayFields: { text: { type: 'richtext', label: 'Nội dung', contentEditable: true } } },
        buttons: { type: 'array', label: 'Các nút bấm', arrayFields: { label: { type: 'text', label: 'Tên nút' }, url: { type: 'text', label: 'Link' }, config: { type: 'object', label: 'Cấu hình Nút', objectFields: { textColor: { type: 'text', label: 'Màu chữ' }, textSize: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }, background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> }, hoverBackground: { type: 'custom', label: 'Màu nền (Hover)', render: (props) => <GenericAdminBackgroundField {...props} /> }, radius: { type: 'object', label: 'Bo góc', objectFields: { all: { type: 'text', label: 'Tất cả (VD: 8px)' } } } } } } },
        imageUrl: { type: 'custom', label: 'Hình ảnh', render: (props) => <GenericImageField {...props} /> }
      },
      render: (props) => <AdminGiaiPhapCongNghe {...props} />
    },
    AdminGiaiPhapNoiBat: {
      label: 'Hexagon Giải pháp - Nổi bật',
      defaultProps: {
        sectionId: '', background: { type: 'color', color: '#ffffff' },
        title: 'Giải pháp nổi bật',
        titleConfig: { color: '#111827', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        subtitle: '', subtitleConfig: { color: '#4B5563', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' },
        items: [
          {
            title: 'Phát triển phần mềm theo yêu cầu',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            description: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh.',
            descConfig: { color: '#4B5563', size: '15px' },
            iconType: 'svg',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            iconColor: '#059669',
            iconBackground: { type: 'color', color: '#ecfdf5' }
          },
          {
            title: 'Giải pháp chuyển đổi số doanh nghiệp',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            description: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng.',
            descConfig: { color: '#4B5563', size: '15px' },
            iconType: 'svg',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            iconColor: '#059669',
            iconBackground: { type: 'color', color: '#ecfdf5' }
          },
          {
            title: 'Xây dựng hệ thống nền tảng & tích hợp',
            titleConfig: { color: '#111827', size: '20px', weight: 'bold', style: 'normal', decoration: 'none' },
            description: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard...) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt.',
            descConfig: { color: '#4B5563', size: '15px' },
            iconType: 'svg',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            iconColor: '#059669',
            iconBackground: { type: 'color', color: '#ecfdf5' }
          }
        ]
      },
      fields: {
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        subtitleConfig: {
          type: 'object', label: 'Cấu hình Mô tả phụ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }
          }
        },
        subtitle: { type: 'text', label: 'Mô tả phụ' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        subtitleConfig: {
          type: 'object', label: 'Cấu hình Mô tả phụ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        items: { type: 'array', label: 'Danh sách giải pháp', arrayFields: { title: { type: 'text', label: 'Tên giải pháp' }, titleConfig: { type: 'object', label: 'Cấu hình Tiêu đề', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }, style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }, decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] } } }, description: { type: 'richtext', label: 'Mô tả', contentEditable: true }, descConfig: { type: 'object', label: 'Cấu hình Mô tả', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' } } }, iconType: { type: 'radio', label: 'Loại Icon', options: [{ label: 'SVG', value: 'svg' }, { label: 'Hình ảnh', value: 'image' }] }, iconSvg: { type: 'textarea', label: 'Mã SVG' }, iconImage: { type: 'custom', label: 'Ảnh Icon', render: (props) => <GenericImageField {...props} /> }, iconColor: { type: 'text', label: 'Màu SVG (Hex)' }, iconBackground: { type: 'custom', label: 'Màu nền Icon', render: (props) => <GenericAdminBackgroundField {...props} /> } } }
      },
      render: (props) => <AdminGiaiPhapNoiBat {...props} />
    },
    AdminQuyTrinhThucHien: {
      label: 'Hexagon Giải pháp - Quy trình',
      defaultProps: {
        sectionId: '', background: { type: 'color', color: '#F8FAFC' },
        title: 'Quy trình thực hiện',
        titleConfig: { color: '#111827', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        subtitle: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.', subtitleConfig: { color: '#4B5563', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' },
        items: [
          {
            title: 'Khảo sát & phân tích yêu cầu',
            titleConfig: { color: '#111827', size: '15px', weight: 'bold', style: 'normal', decoration: 'none' },
            customNumber: '01',
            numberConfig: { color: '#f59e0b', size: '32px', weight: 'bold', style: 'normal', decoration: 'none' }
          },
          {
            title: 'Thiết kế giải pháp & kiến trúc hệ thống',
            titleConfig: { color: '#111827', size: '15px', weight: 'bold', style: 'normal', decoration: 'none' },
            customNumber: '02',
            numberConfig: { color: '#f59e0b', size: '32px', weight: 'bold', style: 'normal', decoration: 'none' }
          },
          {
            title: 'Phát triển & Thử nghiệm',
            titleConfig: { color: '#111827', size: '15px', weight: 'bold', style: 'normal', decoration: 'none' },
            customNumber: '03',
            numberConfig: { color: '#f59e0b', size: '32px', weight: 'bold', style: 'normal', decoration: 'none' }
          },
          {
            title: 'Triển khai & Bảo trì',
            titleConfig: { color: '#111827', size: '15px', weight: 'bold', style: 'normal', decoration: 'none' },
            customNumber: '04',
            numberConfig: { color: '#f59e0b', size: '32px', weight: 'bold', style: 'normal', decoration: 'none' }
          }
        ]
      },
      fields: {
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        subtitle: { type: 'richtext', label: 'Mô tả phụ' },
        subtitleConfig: {
          type: 'object', label: 'Cấu hình Mô tả phụ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        items: { type: 'array', label: 'Danh sách bước', arrayFields: { title: { type: 'text', label: 'Tên bước' }, titleConfig: { type: 'object', label: 'Cấu hình Tiêu đề', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }, style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }, decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] } } }, customNumber: { type: 'text', label: 'Số tuỳ chỉnh' }, numberConfig: { type: 'object', label: 'Cấu hình Số thứ tự', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }, style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }, decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] } } } } }
      },
      render: (props) => <AdminQuyTrinhThucHien {...props} />
    },
    AdminCallToActionGiaiPhap: {
      label: 'Hexagon Giải pháp - Call To Action',
      defaultProps: {
        sectionId: '', background: { type: 'color', color: '#0D5939' },
        title: 'Sẵn sàng triển khai?',
        titleConfig: { color: '#ffffff', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
        description: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        descConfig: { color: 'rgba(255,255,255,0.8)', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' },
        buttonsConfig: {
          textColor: '#ffffff', textSize: '16px', weight: 'bold', style: 'normal', decoration: 'none',
          background: { type: 'color', color: '#0d5939' },
          border: { width: '0px', style: 'none', color: 'transparent' },
          radius: { type: 'all', all: '8px' }
        },
        buttons: [
          { label: 'Về Trang chủ', url: '#', btnConfig: { textColor: '#ffffff', textSize: '16px', weight: 'bold', style: 'normal', decoration: 'none', background: { type: 'color', color: 'rgba(255,255,255,0.1)' }, hoverBackground: { type: 'color', color: 'rgba(255,255,255,0.2)' }, radius: { type: 'all', all: '8px' } } },
          { label: 'Liên hệ ngay', url: '#', btnConfig: { textColor: '#ffffff', textSize: '16px', weight: 'bold', style: 'normal', decoration: 'none', background: { type: 'color', color: '#f59e0b' }, hoverBackground: { type: 'color', color: '#d97706' }, radius: { type: 'all', all: '8px' } } }
        ]
      },
      fields: {
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        descConfig: {
          type: 'object', label: 'Cấu hình Mô tả',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        description: { type: 'textarea', label: 'Mô tả' },
        buttonsConfig: {
          type: 'object', label: 'Định dạng Nút chung',
          objectFields: {
            textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
            textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] },
            background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
            border: {
              type: 'object', label: 'Viền',
              objectFields: {
                width: { type: 'text', label: 'Độ dày (VD: 1px)' },
                style: { type: 'select', label: 'Kiểu viền', options: [{ label: 'Đường liền (solid)', value: 'solid' }, { label: 'Nét đứt (dashed)', value: 'dashed' }, { label: 'Không viền (none)', value: 'none' }] },
                color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
              }
            },
            radius: {
              type: 'object', label: 'Bo góc (Radius)',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo tất cả (VD: 8px, 9999px)' },
                tl: { type: 'text', label: 'Góc trên trái' },
                tr: { type: 'text', label: 'Góc trên phải' },
                bl: { type: 'text', label: 'Góc dưới trái' },
                br: { type: 'text', label: 'Góc dưới phải' }
              }
            },
            boxShadow: { type: 'text', label: 'Đổ bóng (Box Shadow)' },
            customClass: { type: 'text', label: 'Class Hover (VD: hover:brightness-110)' }
          }
        },
        buttons: {
          type: 'array', label: 'Nút hành động',
          arrayFields: {
            label: { type: 'text', label: 'Tên nút', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' },
            btnConfig: {
              type: 'object', label: 'Định dạng riêng (Tùy chọn)',
              objectFields: {
                textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
                textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] },
                background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
                border: {
                  type: 'object', label: 'Viền',
                  objectFields: {
                    width: { type: 'text', label: 'Độ dày (VD: 1px)' },
                    style: { type: 'select', label: 'Kiểu viền', options: [{ label: 'Đường liền (solid)', value: 'solid' }, { label: 'Nét đứt (dashed)', value: 'dashed' }, { label: 'Không viền (none)', value: 'none' }] },
                    color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
                  }
                },
                radius: {
                  type: 'object', label: 'Bo góc (Radius)',
                  objectFields: {
                    type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                    all: { type: 'text', label: 'Bo tất cả (VD: 8px, 9999px)' },
                    tl: { type: 'text', label: 'Góc trên trái' },
                    tr: { type: 'text', label: 'Góc trên phải' },
                    bl: { type: 'text', label: 'Góc dưới trái' },
                    br: { type: 'text', label: 'Góc dưới phải' }
                  }
                },
                boxShadow: { type: 'text', label: 'Đổ bóng (Box Shadow)' },
                customClass: { type: 'text', label: 'Class Hover (VD: hover:brightness-110)' }
              }
            }
          }
        }
      },
      render: (props) => <AdminCallToActionGiaiPhap {...props} />
    },
    AdminBreadcrumbHexagon: {
      label: 'Hexagon Breadcrumb',
      defaultProps: {
        sectionId: '', background: { type: 'color', color: '#F8FAFC' },
        separator: '/',
        separatorConfig: { color: '#9CA3AF', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' },
        activeConfig: { color: '#374151', size: '14px', weight: 'bold', style: 'normal', decoration: 'none' },
        inactiveConfig: { color: '#9CA3AF', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' },
        hoverColor: '#F59E0B',
        items: [{ label: 'Trang chủ', url: '/', isActive: 'false' }, { label: 'Giải pháp', isActive: 'true' }]
      },
      fields: {
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        separator: { type: 'text', label: 'Ký tự phân cách (Vd: / hoặc >)' },
        separatorConfig: {
          type: 'object', label: 'Định dạng phân cách',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
          }
        },
        activeConfig: {
          type: 'object', label: 'Định dạng chữ (Đang chọn)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
          }
        },
        inactiveConfig: {
          type: 'object', label: 'Định dạng chữ (Chưa chọn)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
          }
        },
        hoverColor: { type: 'text', label: 'Màu chữ khi Hover' },
        items: { type: 'array', label: 'Breadcrumb Items', arrayFields: { label: { type: 'text', label: 'Tên' }, url: { type: 'text', label: 'Link' }, isActive: { type: 'radio', label: 'Đang chọn?', options: [{ label: 'Có', value: 'true' }, { label: 'Không', value: 'false' }] } } }
      },
      render: (props) => <AdminBreadcrumbHexagon {...props} />
    },
    AdminFooterHexagon: {
      label: 'Hexagon Footer',
      defaultProps: {
        sectionId: '',
        background: { type: 'color', color: '#1A6B49' },
        copyrightText: 'Copyright 2026 © Hexagon Corporation. All rights reserved.',
        copyrightConfig: { color: '#ffffff', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' }
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
        background: { type: 'custom', label: 'Background', render: (props) => <GenericAdminBackgroundField {...props} /> },
        copyrightText: { type: 'text', label: 'Copyright', contentEditable: true },
        copyrightConfig: {
          type: 'object', label: 'Cấu hình chữ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        }
      },
      render: (props) => <AdminFooterHexagon {...props} />
    },
    AdminBaiVietLienQuanHexagon: {
      label: 'Hexagon Bài Viết Liên Quan',
      defaultProps: {
        sectionId: '',
        background: { type: 'color', color: '#f9fafb' },
        lineColor: '#f59e0b',
        title: 'Bài viết liên quan',
        titleConfig: { color: '#111827', size: '24px', weight: 'bold', style: 'normal', decoration: 'none' },
        cards: [
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            imageRadius: { type: 'all', all: '8px', tl: '0px', tr: '0px', br: '0px', bl: '0px' },
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
            cardTitleHoverColor: '#f59e0b',
            date: '26 tháng 6, 2026',
            dateConfig: { color: '#9ca3af', size: '14px' },
            cardHoverBorderColor: '#f59e0b',
            linkUrl: '#'
          }
        ]
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (vd: bai-viet-lien-quan)' },
        background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        lineColor: { type: 'text', label: 'Màu thanh kế bên Tiêu đề (VD: #f59e0b)' },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
          }
        },
        cards: {
          type: 'array', label: 'Danh sách Bài viết liên quan',
          getItemSummary: (item) => item.title || 'Bài viết',
          defaultItemProps: {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            imageRadius: { type: 'all', all: '8px', tl: '0px', tr: '0px', br: '0px', bl: '0px' },
            title: 'Tiêu đề bài viết mới',
            titleConfig: { color: '#111827', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
            cardTitleHoverColor: '#f59e0b',
            date: 'DD tháng MM, YYYY',
            dateConfig: { color: '#9ca3af', size: '14px' },
            cardHoverBorderColor: '#f59e0b',
            linkUrl: '#'
          },
          arrayFields: {
            imageUrl: { type: 'custom', label: 'Hình ảnh (Click đúp vào ảnh để sửa)', render: (props) => <GenericImageField {...props} /> },
            imageRadius: {
              type: 'object', label: 'Bo góc hình ảnh',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Tuỳ chỉnh từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo 4 góc (VD: 8px)' },
                tl: { type: 'text', label: 'Góc trái trên' },
                tr: { type: 'text', label: 'Góc phải trên' },
                br: { type: 'text', label: 'Góc phải dưới' },
                bl: { type: 'text', label: 'Góc trái dưới' }
              }
            },
            title: { type: 'text', label: 'Tiêu đề bài viết' },
            titleConfig: {
              type: 'object', label: 'Cấu hình Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'In nghiêng', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang chữ', value: 'line-through' }] }
              }
            },
            date: { type: 'text', label: 'Ngày đăng' },
            dateConfig: {
              type: 'object', label: 'Cấu hình Ngày',
              objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } }
            },
            cardTitleHoverColor: { type: 'text', label: 'Màu Tiêu đề khi Hover (VD: #f59e0b)' },
            cardHoverBorderColor: { type: 'text', label: 'Màu viền thẻ khi Hover (VD: #f59e0b)' },
            linkUrl: { type: 'text', label: 'Link bài viết' }
          }
        }
      },
      render: (props) => <AdminBaiVietLienQuanHexagon {...props} />
    },
  },





  // Sidebar categories
  categoryGroups: [
    { title: 'Hexagon Beta', components: ['AdminHeaderHexagon', 'AdminHeroHexagon', 'AdminGioiThieuHexagon', 'AdminDichVuHexagon', 'AdminTinTucHexagon', 'AdminDoiTacHexagon', 'AdminLienHeHexagon', 'AdminBreadcrumbHexagon', 'AdminGiaiPhapCongNghe', 'AdminGiaiPhapNoiBat', 'AdminQuyTrinhThucHien', 'AdminCallToActionGiaiPhap', 'AdminFooterHexagon', 'AdminChiTietBaiVietHexagon'] },


    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero'] },
    { title: 'Câu Lạc Bộ', components: ['Header', 'SenHong', 'CacBan', 'GioiThieu', 'HanhTrinh', 'GiaTri', 'HoiVien'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};


// TỰ ĐỘNG BƠM FIELD LANG VÀO TẤT CẢ COMPONENT
const langField = {
  type: 'select',
  label: 'Ngôn ngữ hiển thị',
  options: [
    { label: 'Tiếng Việt', value: 'vi' },
    { label: 'Tiếng Anh', value: 'en' }
  ]
};

Object.keys(puckConfig.components).forEach(key => {
  if (!puckConfig.components[key].fields) {
    puckConfig.components[key].fields = {};
  }
  puckConfig.components[key].fields = {
    lang: langField,
    ...puckConfig.components[key].fields
  };
});

export default puckConfig;
