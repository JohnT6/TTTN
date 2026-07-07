// import React from 'react';
import { AVAILABLE_LANGUAGES } from './utils/langUtils';

const langCodeOptions = AVAILABLE_LANGUAGES.map(lang => ({ label: lang.label + ' (' + lang.code + ')', value: lang.code }));

import AdminHeaderHexagon from './components/beta_hexagon/admin.header';
import AdminHeroHexagon from './components/beta_hexagon/admin.hero';
import AdminGioiThieuHexagon from './components/beta_hexagon/admin.gioithieu';
import AdminDichVuHexagon from './components/beta_hexagon/admin.dichvu';
import AdminTinTucHexagon from './components/beta_hexagon/admin.tintuc';
import AdminDoiTacHexagon from './components/beta_hexagon/admin.doitac';
import AdminLienHeHexagon from './components/beta_hexagon/admin.lienhe';
import AdminFooterHexagon from './components/beta_hexagon/admin.footer';
import AdminGiaiPhapCongNghe from './components/beta_hexagon/admin.giaiphapcongnghe';
import AdminGiaiPhapNoiBat from './components/beta_hexagon/admin.giaiphapnoibat';
import AdminQuyTrinhThucHien from './components/beta_hexagon/admin.quytrinhthuchien';
import AdminCallToActionGiaiPhap from './components/beta_hexagon/admin.calltoaction';
import AdminChiTietBaiVietHexagon from './components/beta_hexagon/admin.chitietbaiviet';
import AdminHoatDongHexagon from './components/beta_hexagon/admin.hoatdong';
import AdminBreadcrumbHexagon from './components/beta_hexagon/admin.breadcrumb';
import AdminBaiVietLienQuanHexagon from './components/beta_hexagon/admin.baivietlienquan';



 
import AdminHeading from './components/admin-heading';
import AdminText from './components/admin-text';
import AdminImage from './components/admin-image';
import AdminSection from './components/admin-section';
import AdminHero from './components/admin-hero';
import AdminSenHong from './components/admin-senhong';
import AdminCacBan from './components/admin.cacban';
import AdminGioiThieu from './components/admin.gioithieu';
import AdminHeader from './components/admin-header';
import AdminHoiVien from './components/admin-hoivien';
import AdminHanhTrinh from './components/admin.hanhtrinh';
import AdminGiaTri from './components/admin.giatri';
import AdminQuanTam from './components/admin.quantam';
import AdminFooter from './components/admin.footer';
import AdminGioiThieuDoanhNhan from './components/admin.gioiThieuDoanhNhan';
import AdminTrangHoiVien from './components/admin.tranghoivien';
import AdminBackgroundField from './components/metik/admin.backgroundField';
import GenericAdminBackgroundField from './components/beta_hexagon/admin.backgroundField';
import GenericImageField from './components/admin.inlineImage';
import ImageField from './components/admin.inlineImage';
import AdminHeaderMetik from './components/metik/admin.header';
import AdminBannerMetik from './components/metik/admin.banner';
import AdminSanPhamMetik from './components/metik/admin.sanpham';
import AdminGioiThieuMetik from './components/metik/admin.gioithieu';
import AdminVeChungToiMetik from './components/metik/admin.vechungtoi';
import AdminDanhGiaMetik from './components/metik/admin.danhgia';
import AdminFooterMetik from './components/metik/admin.footer';
import AdminLienHeMetik from './components/metik/admin.lienhe';
import AdminBreadcrumbMetik from './components/metik/admin.breadcrumb';
import MetikImageField from './components/metik/admin.inlineImage';

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
            reverseLayout: { type: 'radio', label: 'Vị trí Cột Nội dung', options: [{label: 'Bên trái', value: false}, {label: 'Bên phải', value: true}] },
            sectionId: { type: 'text', label: 'ID Neo (vd: chi-tiet)' },
            lang: { type: 'select', label: 'Ngôn ngữ', options: langCodeOptions },
            background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
            articleTitle: { type: 'text', label: 'Tiêu đề Bài viết' },
            articleTitleConfig: {
                type: 'object', label: 'Cấu hình Tiêu đề',
                objectFields: {
                    color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' },
                    weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                    style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                    decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                    textConfig: { type: 'object', label: 'Cấu hình chữ', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } } }
                },
                defaultItemProps: { text: '<p>Nội dung mới</p>', textConfig: { color: '#374151', size: '18px' } }
            },
            mainImage: { type: 'custom', label: 'Hình ảnh chính', render: (props) => <GenericImageField {...props} /> },
            mainImageRadius: {
                type: 'object', label: 'Bo góc hình ảnh chính',
                objectFields: {
                    type: { type: 'select', label: 'Kiểu bo góc', options: [{label: 'Bo đều 4 góc', value: 'all'}, {label: 'Tuỳ chỉnh từng góc', value: 'custom'}] },
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
                    textConfig: { type: 'object', label: 'Cấu hình chữ', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } } }
                },
                defaultItemProps: { text: '<p>Nội dung mới</p>', textConfig: { color: '#374151', size: '18px' } }
            },
            showContactFooter: { type: 'radio', label: 'Hiển thị thông tin liên hệ ở cuối?', options: [{label: 'Có', value: true}, {label: 'Không', value: false}] },
            contactFooterContent: { type: 'richtext', label: 'Nội dung Liên hệ' },
            services: {
                type: 'array', label: 'Danh sách Dịch vụ (Carousel Cột Phải)',
                arrayFields: {
                    title: { type: 'text', label: 'Tiêu đề Dịch vụ' },
                    titleConfig: { type: 'object', label: 'Cấu hình Tiêu đề', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } } },
                    description: { type: 'richtext', label: 'Mô tả Dịch vụ' },
                    descriptionConfig: { type: 'object', label: 'Cấu hình Mô tả', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' } } },
                    linkLabel: { type: 'text', label: 'Chữ link (VD: Tìm hiểu thêm)' },
                    linkUrl: { type: 'text', label: 'Link dịch vụ' },
                    linkConfig: { type: 'object', label: 'Cấu hình Link', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } } },
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        backgroundColor: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
        hoverTextColor: { type: 'text', label: 'Màu chữ khi Hover' },
        menuItemsConfig: {
    type: 'object', label: 'Định dạng Menu (Desktop)',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        mobileMenuBgColor: { type: 'text', label: 'Màu nền Menu (Mobile)' },
        mobileMenuItemsConfig: {
    type: 'object', label: 'Định dạng Menu (Mobile)',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] },
      background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
      border: {
          type: 'object', label: 'Viền',
          objectFields: {
              width: { type: 'text', label: 'Độ dày (VD: 1px)' },
              style: { type: 'select', label: 'Kiểu viền', options: [{label:'Đường liền (solid)', value:'solid'}, {label:'Nét đứt (dashed)', value:'dashed'}, {label:'Không viền (none)', value:'none'}] },
              color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
          }
      },
      radius: {
          type: 'object', label: 'Bo góc (Radius)',
          objectFields: {
              type: { type: 'select', label: 'Kiểu bo góc', options: [{label:'Tất cả góc', value:'all'}, {label:'Tùy chỉnh từng góc', value:'custom'}] },
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        title2: { type: 'text', label: 'Tiêu đề 2', contentEditable: true },
        title2Config: {
    type: 'object', label: 'Cấu hình Tiêu đề 2 (HEXAGON Solutions)',
    objectFields: {
      background: { type: 'custom', label: 'Màu chữ (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
      size: { type: 'text', label: 'Cỡ chữ' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
    type: 'object', label: 'Cấu hình chữ',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        buttonsConfig: {
    type: 'object', label: 'Định dạng Nút chung',
    objectFields: {
      textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
      textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] },
      background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
      border: {
          type: 'object', label: 'Viền',
          objectFields: {
              width: { type: 'text', label: 'Độ dày (VD: 1px)' },
              style: { type: 'select', label: 'Kiểu viền', options: [{label:'Đường liền (solid)', value:'solid'}, {label:'Nét đứt (dashed)', value:'dashed'}, {label:'Không viền (none)', value:'none'}] },
              color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
          }
      },
      radius: {
          type: 'object', label: 'Bo góc (Radius)',
          objectFields: {
              type: { type: 'select', label: 'Kiểu bo góc', options: [{label:'Tất cả góc', value:'all'}, {label:'Tùy chỉnh từng góc', value:'custom'}] },
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] },
      background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
      border: {
          type: 'object', label: 'Viền',
          objectFields: {
              width: { type: 'text', label: 'Độ dày (VD: 1px)' },
              style: { type: 'select', label: 'Kiểu viền', options: [{label:'Đường liền (solid)', value:'solid'}, {label:'Nét đứt (dashed)', value:'dashed'}, {label:'Không viền (none)', value:'none'}] },
              color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
          }
      },
      radius: {
          type: 'object', label: 'Bo góc (Radius)',
          objectFields: {
              type: { type: 'select', label: 'Kiểu bo góc', options: [{label:'Tất cả góc', value:'all'}, {label:'Tùy chỉnh từng góc', value:'custom'}] },
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
    type: 'object', label: 'Cấu hình chữ',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        quoteAuthor: { type: 'text', label: 'Tác giả', contentEditable: true },
        quoteAuthorConfig: {
    type: 'object', label: 'Cấu hình chữ',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                    weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                    style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                    decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
        descriptionConfig: {
    type: 'object', label: 'Cấu hình chữ',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        serviceTitleConfig: {
    type: 'object', label: 'Định dạng Tiêu đề DV',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        serviceDescConfig: {
    type: 'object', label: 'Định dạng Mô tả DV',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        serviceLinkConfig: {
    type: 'object', label: 'Định dạng Link DV',
    objectFields: {
      color: { type: 'text', label: 'Màu chữ' },
      size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }
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
            reverseLayout: { type: 'radio', label: 'Vị trí Cột Nội dung', options: [{label: 'Bên trái', value: false}, {label: 'Bên phải', value: true}] },
            sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' },
            background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> },
            title: { type: 'text', label: 'Tiêu đề' },
            titleConfig: {
                type: 'object', label: 'Cấu hình Tiêu đề',
                objectFields: {
                    color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 36px)' },
                    weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                    style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                    decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
                }
            },
            description: { type: 'richtext', label: 'Mô tả' },
            descConfig: {
                type: 'object', label: 'Cấu hình Mô tả',
                objectFields: {
                    color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
                    weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                    style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                    decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                        objectFields: { color: { type: 'text', label: 'Màu chữ' }, backgroundColor: { type: 'text', label: 'Màu nền' }, border: { type: 'text', label: 'Viền' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } }
                    },
                    cardLogoText: { type: 'text', label: 'Chữ chìm trên ảnh' },
                    title: { type: 'text', label: 'Tiêu đề bài viết' },
                    titleConfig: {
                        type: 'object', label: 'Cấu hình Tiêu đề',
                        objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } }
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
                        objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } }
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
                        objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } }
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
                        objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] } }
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
        weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
        style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
        decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
      }
  },
          description: { type: 'richtext', label: 'Mô tả', contentEditable: true },
          descriptionConfig: {
      type: 'object', label: 'Cấu hình chữ',
      objectFields: {
        color: { type: 'text', label: 'Màu chữ' },
        size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
        weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
        style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
        decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                      {label: 'Tự động (50% trên, 33% dưới)', value: 'auto'},
                      {label: '50% (1/2 hàng)', value: '50'},
                      {label: '33% (1/3 hàng)', value: '33'},
                      {label: '100% (cả hàng)', value: '100'}
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
                      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }
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
                      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
    }
},
        scroll: {
            type: 'object', label: 'Hiệu ứng cuộn',
            objectFields: {
                direction: { type: 'select', label: 'Chiều cuộn', options: [{label:'Phải sang trái', value:'left'}, {label:'Trái sang phải', value:'right'}] },
                speed: { type: 'text', label: 'Tốc độ (VD: 20s, 15s)' }
            }
        },
        logos: {
          type: 'array', label: 'Danh sách Logo',
          arrayFields: {
            name: { type: 'text', label: 'Tên đối tác', contentEditable: true },
            type: { type: 'select', label: 'Loại hiển thị', options: [{label:'Hình ảnh', value:'image'}, {label:'SVG', value:'svg'}] },
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
          render: (props) => <AdminBackgroundField {...props} />
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
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
        layoutOptions: { type: 'radio', label: 'Bố cục', options: [{label: 'Chữ trái - Ảnh phải', value: 'textLeft'}, {label: 'Ảnh trái - Chữ phải', value: 'imageLeft'}] },
        title: { type: 'text', label: 'Tiêu đề' },
        titleConfig: {
          type: 'object', label: 'Cấu hình Tiêu đề',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        descConfig: {
          type: 'object', label: 'Cấu hình Mô tả',
          objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' } }
        },
        descriptions: { type: 'array', label: 'Các đoạn mô tả', arrayFields: { text: { type: 'richtext', label: 'Nội dung', contentEditable: true } } },
        buttons: { type: 'array', label: 'Các nút bấm', arrayFields: { label: { type: 'text', label: 'Tên nút' }, url: { type: 'text', label: 'Link' }, config: { type: 'object', label: 'Cấu hình Nút', objectFields: { textColor: { type: 'text', label: 'Màu chữ' }, textSize: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }, background: { type: 'custom', label: 'Màu nền', render: (props) => <GenericAdminBackgroundField {...props} /> }, hoverBackground: { type: 'custom', label: 'Màu nền (Hover)', render: (props) => <GenericAdminBackgroundField {...props} /> }, radius: { type: 'object', label: 'Bo góc', objectFields: { all: { type: 'text', label: 'Tất cả (VD: 8px)' } } } } } } },
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
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        subtitleConfig: {
          type: 'object', label: 'Cấu hình Mô tả phụ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        items: { type: 'array', label: 'Danh sách giải pháp', arrayFields: { title: { type: 'text', label: 'Tên giải pháp' }, titleConfig: { type: 'object', label: 'Cấu hình Tiêu đề', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }, style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] }, decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] } } }, description: { type: 'richtext', label: 'Mô tả', contentEditable: true }, descConfig: { type: 'object', label: 'Cấu hình Mô tả', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' } } }, iconType: { type: 'radio', label: 'Loại Icon', options: [{label: 'SVG', value: 'svg'}, {label: 'Hình ảnh', value: 'image'}] }, iconSvg: { type: 'textarea', label: 'Mã SVG' }, iconImage: { type: 'custom', label: 'Ảnh Icon', render: (props) => <GenericImageField {...props} /> }, iconColor: { type: 'text', label: 'Màu SVG (Hex)' }, iconBackground: { type: 'custom', label: 'Màu nền Icon', render: (props) => <GenericAdminBackgroundField {...props} /> } } }
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
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        subtitle: { type: 'richtext', label: 'Mô tả phụ' },
        subtitleConfig: {
          type: 'object', label: 'Cấu hình Mô tả phụ',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        items: { type: 'array', label: 'Danh sách bước', arrayFields: { title: { type: 'text', label: 'Tên bước' }, titleConfig: { type: 'object', label: 'Cấu hình Tiêu đề', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }, style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] }, decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] } } }, customNumber: { type: 'text', label: 'Số tuỳ chỉnh' }, numberConfig: { type: 'object', label: 'Cấu hình Số thứ tự', objectFields: { color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }, style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] }, decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] } } } } }
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
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        descConfig: {
          type: 'object', label: 'Cấu hình Mô tả',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ (VD: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
          }
        },
        description: { type: 'textarea', label: 'Mô tả' },
        buttonsConfig: {
    type: 'object', label: 'Định dạng Nút chung',
    objectFields: {
      textColor: { type: 'text', label: 'Màu chữ (nhập hex hoặc rgba)' },
      textSize: { type: 'text', label: 'Cỡ chữ (VD: 14px)' },
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] },
      background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
      border: {
          type: 'object', label: 'Viền',
          objectFields: {
              width: { type: 'text', label: 'Độ dày (VD: 1px)' },
              style: { type: 'select', label: 'Kiểu viền', options: [{label:'Đường liền (solid)', value:'solid'}, {label:'Nét đứt (dashed)', value:'dashed'}, {label:'Không viền (none)', value:'none'}] },
              color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
          }
      },
      radius: {
          type: 'object', label: 'Bo góc (Radius)',
          objectFields: {
              type: { type: 'select', label: 'Kiểu bo góc', options: [{label:'Tất cả góc', value:'all'}, {label:'Tùy chỉnh từng góc', value:'custom'}] },
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] },
      background: { type: 'custom', label: 'Nền (Hỗ trợ Gradient)', render: (props) => <GenericAdminBackgroundField {...props} /> },
      border: {
          type: 'object', label: 'Viền',
          objectFields: {
              width: { type: 'text', label: 'Độ dày (VD: 1px)' },
              style: { type: 'select', label: 'Kiểu viền', options: [{label:'Đường liền (solid)', value:'solid'}, {label:'Nét đứt (dashed)', value:'dashed'}, {label:'Không viền (none)', value:'none'}] },
              color: { type: 'text', label: 'Màu viền (hỗ trợ rgba)' }
          }
      },
      radius: {
          type: 'object', label: 'Bo góc (Radius)',
          objectFields: {
              type: { type: 'select', label: 'Kiểu bo góc', options: [{label:'Tất cả góc', value:'all'}, {label:'Tùy chỉnh từng góc', value:'custom'}] },
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
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }
          }
        },
        activeConfig: {
          type: 'object', label: 'Định dạng chữ (Đang chọn)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }
          }
        },
        inactiveConfig: {
          type: 'object', label: 'Định dạng chữ (Chưa chọn)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' }, size: { type: 'text', label: 'Cỡ chữ' }, weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] }
          }
        },
        hoverColor: { type: 'text', label: 'Màu chữ khi Hover' },
        items: { type: 'array', label: 'Breadcrumb Items', arrayFields: { label: { type: 'text', label: 'Tên' }, url: { type: 'text', label: 'Link' }, isActive: { type: 'radio', label: 'Đang chọn?', options: [{label:'Có', value:'true'}, {label:'Không', value:'false'}] } } }
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
      weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
      style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
      decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                    weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                    style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                    decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
                            type: { type: 'select', label: 'Kiểu bo góc', options: [{label: 'Bo đều 4 góc', value: 'all'}, {label: 'Tuỳ chỉnh từng góc', value: 'custom'}] },
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
                            weight: { type: 'select', label: 'Độ đậm', options: [{label:'Bình thường', value:'normal'}, {label:'In đậm', value:'bold'}] },
                            style: { type: 'select', label: 'In nghiêng', options: [{label:'Bình thường', value:'normal'}, {label:'In nghiêng', value:'italic'}] },
                            decoration: { type: 'select', label: 'Gạch chân', options: [{label:'Không', value:'none'}, {label:'Gạch chân', value:'underline'}, {label:'Gạch ngang chữ', value:'line-through'}] }
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
    AdminHeaderMetik: {
      label: 'MeTik Header',
      defaultProps: {
        logoUrl: '/logo.png',
        stickyScrollThreshold: 300,
        langOptions: [
          { langCode: 'vi', label: 'VN', flagUrl: 'https://flagcdn.com/w20/vn.png' },
          { langCode: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w20/gb.png' }
        ],
        navItems: []
      },
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        stickyScrollThreshold: { type: 'number', label: 'Vị trí cuộn (px) để hiện Header nhỏ', default: 300 },
        langOptions: {
          type: 'array',
          label: 'Các nút chọn Ngôn ngữ',
          arrayFields: {
            langCode: { type: 'select', label: 'Hệ thống xử lý (Mã NN)', options: langCodeOptions },
            flagUrl: { type: 'text', label: 'Link Icon Lá cờ (tuỳ chọn)' },
            label: { type: 'text', label: 'Tên nút (VN, EN,...)' }
          }
        },
        navItems: {
          type: 'array',
          label: 'Menu Điều hướng',
          arrayFields: {
            label: { type: 'text', label: 'Tên Menu' },
            url: { type: 'text', label: 'Đường dẫn (URL) - Dùng nếu không phải Mega Menu' },
            isMegaMenu: {
              type: 'radio',
              label: 'Là Mega Menu?',
              options: [
                { label: 'Không', value: false },
                { label: 'Có', value: true }
              ]
            },
            subLinks: {
              type: 'array',
              label: 'Danh sách liên kết con (Mega Menu)',
              arrayFields: {
                columnTitle: { type: 'text', label: 'Tên nhóm/cột (ví dụ: Về CLB)' },
                label: { type: 'text', label: 'Tên liên kết' },
                url: { type: 'text', label: 'Đường dẫn liên kết' },
                description: { type: 'text', label: 'Mô tả ngắn' }
              },
              getItemSummary: (item) => `${item.columnTitle || 'Chưa phân nhóm'} - ${item.label || 'Chưa đặt tên'}`
            }
          },
          getItemSummary: (item) => item.label || 'Menu mới'
        },
        socials: {
          type: 'array',
          label: 'Mạng xã hội (Socials)',
          arrayFields: {
            iconUrl: { type: 'text', label: 'URL Icon' },
            url: { type: 'text', label: 'Đường dẫn' },
            alt: { type: 'text', label: 'Alt text' }
          },
          getItemSummary: (item) => item.alt || 'Social mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        logoUrl: '/logometik.png',
        stickyScrollThreshold: 300,
        navItems: [
          { label: 'TRANG CHỦ', url: '#', isMegaMenu: false },
          { label: 'GIỚI THIỆU', url: '#', isMegaMenu: false },
          { label: 'SẢN PHẨM', url: '#', isMegaMenu: false },
          { label: 'TIN TỨC', url: '#', isMegaMenu: false },
          { label: 'LIÊN HỆ', url: '#', isMegaMenu: false }
        ],
        socials: [
          { iconUrl: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', url: '#', alt: 'Facebook' },
          { iconUrl: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', url: '#', alt: 'TikTok' },
          { iconUrl: 'https://cdn-icons-png.flaticon.com/512/145/145807.png', url: '#', alt: 'LinkedIn' }
        ]
      },
      render: (props) => <AdminHeaderMetik {...props} />
    },
    AdminBannerMetik: {
      label: 'MeTik Banner',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        autoplay: { type: 'radio', label: 'Tự động chạy?', options: [{ label: 'Có', value: true }, { label: 'Không', value: false }] },
        autoplaySpeed: { type: 'number', label: 'Tốc độ (ms)', default: 5000 },
        banners: {
          type: 'array',
          label: 'Danh sách Banner',
          arrayFields: {
            imageUrl: {
              type: 'custom',
              label: 'Ảnh Banner',
              render: (props) => <MetikImageField {...props} />
            },
            title: { type: 'text', label: 'Tiêu đề (Tùy chọn)' },
            subtitle: { type: 'text', label: 'Mô tả (Tùy chọn)' },
            alt: { type: 'text', label: 'Alt text' }
          },
          getItemSummary: (item) => item.title || 'Banner mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        autoplay: true,
        autoplaySpeed: 5000,
        banners: [
          { imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik.webp', title: '', subtitle: '', alt: 'Banner 1' },
          { imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/banner-metik-2-1-scaled.webp', title: '', subtitle: '', alt: 'Banner 2' }
        ]
      },
      render: (props) => <AdminBannerMetik {...props} />
    },
    AdminSanPhamMetik: {
      label: 'MeTik Sản Phẩm Mới',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object',
          label: 'Định dạng tiêu đề',
          objectFields: {
            bgColor: { type: 'text', label: 'Màu nền trang trí (Mã Hex)' },
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (vd: 30px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }, { label: 'Black', value: '900' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang', value: 'line-through' }] }
          }
        },
        products: {
          type: 'array',
          label: 'Danh sách Sản phẩm',
          arrayFields: {
            title: { type: 'text', label: 'Tên Sản phẩm', contentEditable: true },
            titleConfig: {
              type: 'object',
              label: 'Định dạng tên',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (vd: 18px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            },
            imageUrl: {
              type: 'custom',
              label: 'Ảnh Sản phẩm',
              render: (props) => <MetikImageField {...props} />
            },
            alt: { type: 'text', label: 'Alt text' }
          },
          defaultItemProps: {
            title: 'Sản phẩm mới',
            titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
            imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp',
            alt: 'Sản phẩm mới'
          },
          getItemSummary: (item) => item.title || 'Sản phẩm mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        title: 'SẢN PHẨM MỚI',
        titleConfig: { color: '#2e7d32', size: '30px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
        background: { type: 'color', color: '#ffffff' },
        products: [
          { title: 'Snack vị Tảo biển', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp', alt: 'Snack vị Tảo biển' },
          { title: 'Snack vị BBQ', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg.webp', alt: 'Snack vị BBQ' },
          { title: 'Snack vị Bắp', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg.webp', alt: 'Snack vị Bắp' },
          { title: 'Snack vị Phô mai', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp', alt: 'Snack vị Phô mai' }
        ]
      },
      render: (props) => <AdminSanPhamMetik {...props} />
    },
    
    AdminBreadcrumbMetik: {
      label: 'MeTik Breadcrumb',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        separator: { type: 'text', label: 'Dấu phân cách (vd: / hoặc >)' },
        separatorConfig: {
          type: 'object', label: 'Định dạng dấu phân cách',
          objectFields: {
            color: { type: 'text', label: 'Màu sắc' },
            size: { type: 'text', label: 'Cỡ chữ (vd: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
          }
        },
        inactiveConfig: {
          type: 'object', label: 'Định dạng mục chưa chọn (có Link)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
          }
        },
        activeConfig: {
          type: 'object', label: 'Định dạng mục đang chọn (không Link)',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] }
          }
        },
        hoverColor: { type: 'text', label: 'Màu khi di chuột (Hover)' },
        items: {
          type: 'array', label: 'Danh sách mục (Items)',
          arrayFields: {
            label: { type: 'text', label: 'Tên mục' },
            url: { type: 'text', label: 'Đường dẫn liên kết (Link)' },
            isActive: { type: 'select', label: 'Đang hiển thị (không dùng Link)?', options: [{label: 'Không (Có Link)', value: 'false'}, {label: 'Có (Không Link)', value: 'true'}] }
          },
          defaultItemProps: {
            label: 'SẢN PHẨM',
            url: '#',
            isActive: 'false'
          },
          getItemSummary: (item) => item.label || 'Mục mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'color', color: '#ffffff' },
        separator: '/',
        separatorConfig: { color: '#9ca3af', size: '16px', weight: 'normal' },
        inactiveConfig: { color: '#6b7280', size: '16px', weight: 'normal' },
        activeConfig: { color: '#111827', size: '16px', weight: 'bold' },
        hoverColor: '#2e7d32',
        items: [
          { label: 'TRANG CHỦ', url: '/', isActive: 'false' },
          { label: 'SẢN PHẨM', url: '', isActive: 'true' }
        ]
      },
      render: (props) => <AdminBreadcrumbMetik {...props} />
    },

    
    AdminLienHeMetik: {
      label: 'MeTik Liên Hệ',
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
          render: (props) => <AdminBackgroundField {...props} />
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
        iframeCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.567585007675!2d106.5350227!3d10.9204308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b2d6619d65c51%3A0xaa40266b17ad7191!2zQ8O0bmcgdHkgQ-G7lSBQaOG6p24gT0NIQU8!5e0!3m2!1svi!2s!4v1782890735831!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
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
      render: (props) => <AdminLienHeMetik {...props} />
    },

    AdminGioiThieuMetik: {
      label: 'MeTik Giới Thiệu',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object',
          label: 'Định dạng tiêu đề',
          objectFields: {
            bgColor: { type: 'text', label: 'Màu nền trang trí (Mã Hex)' },
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (vd: 30px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }, { label: 'Black', value: '900' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang', value: 'line-through' }] }
          }
        },
        description: { type: 'richtext', label: 'Mô tả ngắn', contentEditable: true },
        descriptionConfig: {
          type: 'object',
          label: 'Định dạng mô tả',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (vd: 16px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
          }
        },
        rows: {
          type: 'array',
          label: 'Danh sách Hàng (Rows)',
          arrayFields: {
            layout: {
              type: 'select',
              label: 'Vị trí Layout',
              options: [
                { label: 'Ảnh Trái - Chữ Phải', value: 'image_left' },
                { label: 'Ảnh Phải - Chữ Trái', value: 'image_right' }
              ]
            },
            imageUrl: {
              type: 'custom',
              label: 'Ảnh',
              render: (props) => <MetikImageField {...props} />
            },
            imageRadius: {
              type: 'object',
              label: 'Bo góc ảnh',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo đều (vd: 16px)' },
                tl: { type: 'text', label: 'Trái-Trên' },
                tr: { type: 'text', label: 'Phải-Trên' },
                br: { type: 'text', label: 'Phải-Dưới' },
                bl: { type: 'text', label: 'Trái-Dưới' }
              }
            },
            textBlocks: {
              type: 'array',
              label: 'Danh sách Đoạn văn (Blocks)',
              arrayFields: {
                type: {
                  type: 'select',
                  label: 'Loại đoạn',
                  options: [
                    { label: 'Đoạn văn (Paragraph)', value: 'paragraph' },
                    { label: 'Gạch đầu dòng (Bullet)', value: 'list_item' }
                  ]
                },
                content: { type: 'richtext', label: 'Nội dung', contentEditable: true },
                textConfig: {
                  type: 'object',
                  label: 'Định dạng chữ',
                  objectFields: {
                    color: { type: 'text', label: 'Màu chữ' },
                    size: { type: 'text', label: 'Cỡ chữ (vd: 16px)' },
                    weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                    style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                    decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
                  }
                }
              },
              defaultItemProps: {
                type: 'paragraph',
                content: 'Nội dung đoạn văn mới...',
                textConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' }
              },
              getItemSummary: (item) => {
                const plainText = (item.content || '').replace(/<[^>]*>?/gm, '').trim();
                return plainText ? plainText.substring(0, 40) + '...' : 'Đoạn văn mới...';
              }
            }
          },
          defaultItemProps: {
            layout: 'image_left',
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/hinh3.webp',
            imageRadius: { type: 'all', all: '16px' },
            textBlocks: [
              { type: 'paragraph', content: 'Nội dung...', textConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } }
            ]
          },
          getItemSummary: (item, index) => {
            const idx = index !== undefined ? index + 1 : '';
            const layoutName = item.layout === 'image_left' ? 'Ảnh trái' : 'Ảnh phải';
            let preview = '';
            if (item.textBlocks && item.textBlocks.length > 0 && item.textBlocks[0].content) {
               preview = ' - ' + item.textBlocks[0].content.slice(0, 30) + '...';
            }
            return `Hàng ${idx} (${layoutName})${preview}`;
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        title: 'GIỚI THIỆU VỀ METIK',
        titleConfig: { color: '#2e7d32', size: '30px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
        background: { type: 'color', color: '#ffffff' },
        description: 'metik là thương hiệu snack thuộc OCHAO, được phát triển trong hệ sinh thái HUNGHAU Holdings với định hướng mang đến những sản phẩm ăn vặt thơm ngon, vui tươi và phù hợp với nhịp sống hiện đại.',
        descriptionConfig: { color: '#374151', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' },
        rows: [
          {
            layout: 'image_left',
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/hinh3.webp',
            imageRadius: { type: 'all', all: '24px', tl: '0px', tr: '0px', br: '0px', bl: '0px' },
            textBlocks: [
              { type: 'paragraph', content: 'Ra đời từ nền tảng sản xuất bánh kẹo của OCHAO, METIK kế thừa hệ thống nhà máy hiện đại, quy trình sản xuất khép kín và tiêu chuẩn kiểm soát chất lượng nghiêm ngặt. METIK tập trung phát triển các dòng snack giòn, nhẹ, dễ ăn và phù hợp với nhiều nhóm khách hàng. Sản phẩm được nghiên cứu với nhiều hương vị hấp dẫn như rong biển, bắp, phô mai, BBQ và các hương vị đặc trưng khác.', textConfig: { color: '#4b5563', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' } }
            ]
          },
          {
            layout: 'image_right',
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/hinh0003.webp',
            imageRadius: { type: 'custom', all: '0px', tl: '0px', tr: '40px', br: '0px', bl: '40px' },
            textBlocks: [
              { type: 'list_item', content: 'Sử dụng nguyên liệu có nguồn gốc rõ ràng, phù hợp với tiêu chuẩn sản xuất thực phẩm.', textConfig: { color: '#4b5563', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' } },
              { type: 'list_item', content: 'Quy trình sản xuất hiện đại, khép kín và đảm bảo vệ sinh an toàn thực phẩm.', textConfig: { color: '#4b5563', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' } },
              { type: 'list_item', content: 'Kiểm soát chất lượng chặt chẽ trong từng công đoạn, từ nguyên liệu đầu vào đến thành phẩm.', textConfig: { color: '#4b5563', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' } }
            ]
          },
          {
            layout: 'image_left',
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/hinh2.jpg.webp',
            imageRadius: { type: 'custom', all: '0px', tl: '40px', tr: '0px', br: '40px', bl: '0px' },
            textBlocks: [
              { type: 'paragraph', content: 'Với hương vị hấp dẫn, phong cách trẻ trung và tinh thần vui nhộn, METIK hướng đến hình ảnh một thương hiệu snack năng động, gần gũi và dễ tạo thiện cảm với người tiêu dùng Việt Nam.', textConfig: { color: '#4b5563', size: '18px', weight: 'normal', style: 'normal', decoration: 'none' } }
            ]
          }
        ]
      },
      render: (props) => <AdminGioiThieuMetik {...props} />
    },
    AdminVeChungToiMetik: {
      label: 'MeTik Về Chúng Tôi',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        layout: {
          type: 'select',
          label: 'Vị trí Layout',
          options: [
            { label: 'Chữ Trái - Video Phải', value: 'text_left' },
            { label: 'Video Trái - Chữ Phải', value: 'video_left' }
          ]
        },
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object',
          label: 'Định dạng tiêu đề',
          objectFields: {
            bgColor: { type: 'text', label: 'Màu nền trang trí (Mã Hex)' },
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (vd: 30px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }, { label: 'Black', value: '900' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }, { label: 'Gạch ngang', value: 'line-through' }] }
          }
        },
        textBlocks: {
          type: 'array',
          label: 'Danh sách Đoạn văn (Blocks)',
          arrayFields: {
            content: { type: 'richtext', label: 'Nội dung (Hỗ trợ HTML: <b>chữ</b>, <i>chữ</i>, <u>chữ</u>)' },
            textConfig: {
              type: 'object',
              label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ (vd: 16px)' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            }
          },
          defaultItemProps: {
            content: 'Nội dung đoạn văn mới...',
            textConfig: { color: '#374151', size: '21px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          getItemSummary: (item) => {
            const plainText = (item.content || '').replace(/<[^>]*>?/gm, '').trim();
            return plainText ? plainText.substring(0, 40) + '...' : 'Đoạn văn mới...';
          }
        },
        videoUrl: { type: 'text', label: 'Đường dẫn (URL) Video' },
        videoRadius: {
          type: 'object',
          label: 'Bo góc khung Video',
          objectFields: {
            type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
            all: { type: 'text', label: 'Bo đều (vd: 16px)' },
            tl: { type: 'text', label: 'Trái-Trên' },
            tr: { type: 'text', label: 'Phải-Trên' },
            br: { type: 'text', label: 'Phải-Dưới' },
            bl: { type: 'text', label: 'Trái-Dưới' }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        layout: 'text_left',
        title: 'VỀ CHÚNG TÔI',
        titleConfig: { color: '#2e7d32', size: '30px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
        background: { type: 'color', color: '#ffffff' },
        textBlocks: [
          {
            content: 'Với tinh thần “Chạm mê tít – Snap into Joy”, <b>metik</b> mong muốn trở thành người bạn đồng hành trong những khoảnh khắc vui vẻ hằng ngày. Từ những buổi gặp gỡ bạn bè, giờ giải lao, chuyến đi chơi đến những phút thư giãn tại nhà, <b>metik</b> mang đến trải nghiệm ăn vặt giòn ngon, trẻ trung và đầy cảm hứng.',
            textConfig: { color: '#4b5563', size: '21px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          {
            content: '<b>metik</b> không chỉ là một sản phẩm snack. <b>metik</b> là cảm giác giòn vui khi mở gói, là hương vị dễ mê trong từng miếng bánh và là nguồn năng lượng tích cực cho những khoảnh khắc thường ngày.',
            textConfig: { color: '#4b5563', size: '21px', weight: 'normal', style: 'normal', decoration: 'none' }
          }
        ],
        videoUrl: 'https://metik.vn/wp-content/uploads/2026/06/METIK-ChamMeTit.mp4?_=1',
        videoRadius: { type: 'custom', all: '0px', tl: '0px', tr: '40px', br: '0px', bl: '40px' }
      },
      render: (props) => <AdminVeChungToiMetik {...props} />
    },
    AdminDanhGiaMetik: {
      label: 'MeTik Đánh Giá',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        titleConfig: {
          type: 'object', label: 'Định dạng tiêu đề',
          objectFields: {
            bgColor: { type: 'text', label: 'Màu nền trang trí (Mã Hex)' },
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ (vd: 30px)' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }, { label: 'Black', value: '900' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
          }
        },
        reviews: {
          type: 'array',
          label: 'Danh sách Đánh giá',
          arrayFields: {
            imageUrl: {
              type: 'custom',
              label: 'Ảnh Khách hàng',
              render: (props) => <MetikImageField {...props} />
            },
            imageRadius: {
              type: 'object',
              label: 'Bo góc ảnh',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo đều 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo đều (vd: 50%)' },
                tl: { type: 'text', label: 'Trái-Trên' },
                tr: { type: 'text', label: 'Phải-Trên' },
                br: { type: 'text', label: 'Phải-Dưới' },
                bl: { type: 'text', label: 'Trái-Dưới' }
              }
            },
            rating: { type: 'number', label: 'Số Sao (0.5 - 5)', min: 0.5, max: 5, step: 0.5 },
            quote: { type: 'richtext', label: 'Nội dung đánh giá', contentEditable: true },
            quoteConfig: {
              type: 'object', label: 'Định dạng Nội dung',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }
              }
            },
            author: { type: 'richtext', label: 'Tên Khách hàng', contentEditable: true },
            authorConfig: {
              type: 'object', label: 'Định dạng Tên',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }
              }
            }
          },
          defaultItemProps: {
            imageUrl: 'https://via.placeholder.com/200x200?text=Khach+Hang',
            imageRadius: { type: 'all', all: '50%' },
            rating: 5,
            quote: '"Sản phẩm này thật sự xuất sắc, tôi rất hài lòng khi sử dụng!"',
            quoteConfig: { color: '#6b7280', size: '18px', weight: 'normal', style: 'italic' },
            author: 'Khách Hàng Mới, Hà Nội',
            authorConfig: { color: '#4b5563', size: '16px', weight: 'bold', style: 'normal' }
          },
          getItemSummary: (item) => {
            const plainText = (item.author || '').replace(/<[^>]*>?/gm, '').trim();
            return plainText ? plainText.substring(0, 40) + '...' : 'Khách hàng';
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        title: 'KHÁCH HÀNG NÓI GÌ?',
        titleConfig: { color: '#4caf50', size: '28px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
        background: { type: 'color', color: '#ffffff' },
        reviews: [
          {
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/huynhvinh.webp',
            rating: 5,
            quote: '"Snack metik ăn vừa giòn, vừa ngon vừa cuốn miệng. Em thường lựa chọn để mang theo tới trường"',
            quoteConfig: { color: '#6b7280', size: '18px', weight: 'normal', style: 'italic' },
            author: 'Sinh viên Huỳnh Vĩnh, TP.HCM',
            authorConfig: { color: '#374151', size: '16px', weight: 'bold', style: 'normal' }
          },
          {
            imageUrl: 'https://metik.vn/wp-content/uploads/2021/05/myduyen.webp',
            rating: 5,
            quote: '"metik gợi nhớ cho em rất nhiều kỉ niệm thời thơ ấu. Hy vọng nhãn hàng trong tương lai sẽ ra nhiều sản phẩm độc đáo hơn nữa."',
            quoteConfig: { color: '#6b7280', size: '18px', weight: 'normal', style: 'italic' },
            author: 'Bạn Mỹ Duyên, Đồng Tháp',
            authorConfig: { color: '#374151', size: '16px', weight: 'bold', style: 'normal' }
          }
        ]
      },
      render: (props) => <AdminDanhGiaMetik {...props} />
    },
    AdminFooterMetik: {
      label: 'MeTik Footer',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        logoUrl: {
          type: 'custom',
          label: 'Logo Footer',
          render: (props) => <MetikImageField {...props} />
        },
        description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        descriptionConfig: {
          type: 'object', label: 'Định dạng Mô tả',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }
          }
        },
        columns: {
          type: 'array',
          label: 'Các Cột Thông Tin',
          arrayFields: {
            title: { type: 'text', label: 'Tiêu đề Cột', contentEditable: true },
            titleConfig: {
              type: 'object', label: 'Định dạng Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ' },
                size: { type: 'text', label: 'Cỡ chữ' },
                weight: { type: 'select', label: 'Độ đậm', options: [{label: 'Normal', value: 'normal'}, {label: 'Bold', value: 'bold'}] },
                style: { type: 'select', label: 'Kiểu', options: [{label: 'Bình thường', value: 'normal'}, {label: 'In nghiêng', value: 'italic'}] }
              }
            },
            items: {
              type: 'array',
              label: 'Danh sách Item',
              arrayFields: {
                tagType: { type: 'select', label: 'Loại thẻ', options: [{label: 'Văn bản thường (<p>)', value: 'p'}, {label: 'Đường dẫn (<a>)', value: 'link'}] },
                linkAction: { type: 'select', label: 'Hành động Link', options: [{label: 'Trang Web', value: 'url'}, {label: 'Gọi điện (tel:)', value: 'tel'}, {label: 'Email (mailto:)', value: 'mail'}] },
                urlValue: { type: 'text', label: 'Giá trị URL / SĐT' },
                iconType: { type: 'select', label: 'Loại Icon', options: [{label: 'Không có', value: 'none'}, {label: 'Điện thoại', value: 'phone'}, {label: 'Email', value: 'mail'}, {label: 'Vị trí', value: 'location'}, {label: 'Tùy chỉnh (SVG)', value: 'custom'}] },
                customSvg: { type: 'textarea', label: 'Mã SVG Tùy chỉnh' },
                text: { type: 'textarea', label: 'Nội dung hiển thị', contentEditable: true },
                itemConfig: {
                  type: 'object', label: 'Định dạng chữ',
                  objectFields: {
                    color: { type: 'text', label: 'Màu chữ' },
                    size: { type: 'text', label: 'Cỡ chữ' },
                    weight: { type: 'select', label: 'Độ đậm', options: [{label: 'Normal', value: 'normal'}, {label: 'Bold', value: 'bold'}] },
                    style: { type: 'select', label: 'Kiểu', options: [{label: 'Bình thường', value: 'normal'}, {label: 'In nghiêng', value: 'italic'}] }
                  }
                }
              },
              defaultItemProps: {
                tagType: 'p', linkAction: 'url', urlValue: '', iconType: 'none', customSvg: '', text: 'Nội dung...',
                itemConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' }
              },
              getItemSummary: (item) => item.text || 'Item'
            }
          },
          defaultItemProps: {
            title: 'CỘT MỚI',
            titleConfig: { color: '#16a34a', size: '18px', weight: 'bold', style: 'normal' },
            items: [
              {
                tagType: 'p', linkAction: 'url', urlValue: '', iconType: 'none', customSvg: '',
                text: 'Thông tin mẫu 1',
                itemConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' }
              },
              {
                tagType: 'link', linkAction: 'url', urlValue: '#', iconType: 'none', customSvg: '',
                text: 'Đường dẫn mẫu 2',
                itemConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' }
              }
            ]
          },
          getItemSummary: (col) => col.title || 'Cột'
        },
        copyrightText: { type: 'text', label: 'Dòng Copyright', contentEditable: true },
        copyrightConfig: {
          type: 'object', label: 'Định dạng Copyright',
          objectFields: {
            color: { type: 'text', label: 'Màu chữ' },
            size: { type: 'text', label: 'Cỡ chữ' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }
          }
        },
        background: {
          type: 'object', label: 'Background Phần trên',
          objectFields: {
            type: { type: 'select', label: 'Loại', options: [{ label: 'Màu sắc', value: 'color' }, { label: 'Gradient', value: 'gradient' }, { label: 'Hình ảnh', value: 'image' }, { label: 'Ảnh & Gradient', value: 'image_gradient' }, { label: 'Ảnh & Màu sắc', value: 'image_color' }] },
            color: { type: 'text', label: 'Màu nền', default: '#fbc02d' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
        },
        bottomBackground: {
          type: 'object', label: 'Background Phần dưới',
          objectFields: {
            type: { type: 'select', label: 'Loại', options: [{ label: 'Màu sắc', value: 'color' }, { label: 'Gradient', value: 'gradient' }, { label: 'Hình ảnh', value: 'image' }, { label: 'Ảnh & Gradient', value: 'image_gradient' }, { label: 'Ảnh & Màu sắc', value: 'image_color' }] },
            color: { type: 'text', label: 'Màu nền', default: '#f97316' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        logoUrl: '/logometik.png',
        description: 'METIK - một thế giới snack dành cho những ai yêu sự giòn giòn ngất ngây, hương vị trẻ trung, đầy cảm hứng để mỗi ngày đều căng tràn sức sống.',
        descriptionConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' },
        background: { type: 'color', color: '#fbc02d' },
        bottomBackground: { type: 'color', color: '#f97316' },
        columns: [
          {
            title: 'THÔNG TIN LIÊN HỆ',
            titleConfig: { color: '#16a34a', size: '18px', weight: 'bold', style: 'normal' },
            items: [
              {
                tagType: 'link', linkAction: 'tel', urlValue: '+84797213333', iconType: 'phone', customSvg: '',
                text: '(+84) 79 721 3333',
                itemConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' }
              },
              {
                tagType: 'link', linkAction: 'mail', urlValue: 'sale@ochao.vn', iconType: 'mail', customSvg: '',
                text: 'sale@ochao.vn',
                itemConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' }
              },
              {
                tagType: 'p', linkAction: 'url', urlValue: '', iconType: 'location', customSvg: '',
                text: 'Lô C3-1, Đường D2-N7, KCN Tân Phú Trung, Xã Củ Chi, TP.HCM..',
                itemConfig: { color: '#374151', size: '16px', weight: 'normal', style: 'normal' }
              }
            ]
          }
        ],
        copyrightText: 'Copyright 2026 © METIK. All rights reserved',
        copyrightConfig: { color: '#ffffff', size: '14px', weight: 'normal', style: 'normal' }
      },
      render: (props) => <AdminFooterMetik {...props} />
    },
    Heading: {
      label: 'Tiêu đề',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        content: { type: 'text', label: 'Nội dung', contentEditable: true },
        level: {
          type: 'select', label: 'Cấp độ',
          options: [
            { label: 'H1', value: 1 }, { label: 'H2', value: 2 },
            { label: 'H3', value: 3 }, { label: 'H4', value: 4 },
            { label: 'H5', value: 5 }, { label: 'H6', value: 6 }
          ]
        },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        sectionId: '',  content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' },
            { label: 'Đều', value: 'justify' }
          ]
        }
      },
      defaultProps: {
        sectionId: '',  content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        src: { type: 'text', label: 'URL ảnh' },
        alt: { type: 'text', label: 'Alt text' },
        width: { type: 'text', label: 'Chiều rộng', default: '100%' },
        height: { type: 'text', label: 'Chiều cao', default: 'auto' },
        borderRadius: { type: 'text', label: 'Bo góc', default: '0' },
        align: {
          type: 'select', label: 'Căn lề',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        }
      },
      defaultProps: {
        sectionId: '', 
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
        sectionId: '', 
        container: 'lg',
        background: { type: 'color', color: '#ffffff' },
        padding_x: 4, padding_y: 4,
        content: []
      },
      render: (props) => <AdminSection {...props} />
    },

    Hero: {
      label: 'Hero Banner',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
            text: { type: 'text', label: 'Text nút', contentEditable: true },
            url: { type: 'text', label: 'URL' },
            style: {
              type: 'select', label: 'Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' }
              ]
            }
          },
          getItemSummary: (item) => item.text
        },
        layout: {
          type: 'object', label: 'Bố cục',
          objectFields: {
            align: {
              type: 'select', label: 'Căn lề',
              options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
              ]
            }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        title: 'Chào mừng đến với website',
        subtitle: 'Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất',
        buttons: [
          { text: 'Tìm hiểu thêm', url: '#', style: 'primary' },
          { text: 'Liên hệ', url: '#contact', style: 'outline' }
        ],
        background: {
          type: 'gradient',
          gradientFrom: '#667eea', gradientTo: '#764ba2',
          gradientDirection: 'to bottom right'
        },
        layout: { align: 'center' }
      },
      render: (props) => <AdminHero {...props} />
    },

    SenHong: {
      label: 'Khối Sen Hồng',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        align: {
          type: 'select', label: 'Vị trí cụm sen hồng',
          options: [
            { label: 'Nằm bên trái', value: 'left' },
            { label: 'Nằm giữa', value: 'center' },
            { label: 'Nằm bên phải', value: 'right' }
          ]
        },
        blockRadius: {
          type: 'object',
          label: 'Bo góc cụm sen hồng',
          objectFields: {
            type: {
              type: 'select', label: 'Kiểu bo góc',
              options: [
                { label: 'Bo 4 góc', value: 'all' },
                { label: 'Bo từng góc', value: 'custom' }
              ]
            },
            all: { type: 'text', label: 'Bán kính bo 4 góc', default: '16px' },
            tl: { type: 'text', label: 'Trên - Trái (Từng góc)', default: '13px' },
            tr: { type: 'text', label: 'Trên - Phải (Từng góc)', default: '90px' },
            br: { type: 'text', label: 'Dưới - Phải (Từng góc)', default: '13px' },
            bl: { type: 'text', label: 'Dưới - Trái (Từng góc)', default: '90px' }
          }
        },
        eyebrow: {
          type: 'object',
          label: 'Chữ nhỏ trên cùng',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            color: { type: 'text', label: 'Màu chữ nhỏ', default: '#ffffff' },
            size: { type: 'text', label: 'Cỡ chữ nhỏ', default: '14px' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
          }
        },
        title: {
          type: 'object',
          label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            size: { type: 'text', label: 'Kích thước chữ tiêu đề', default: '60px' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] },
            background: {
              type: 'object', label: 'Màu tiêu đề',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại màu',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu (Hex)', default: '#fde047' },
                gradientFrom: { type: 'text', label: 'Gradient Từ', default: '#fde047' },
                gradientTo: { type: 'text', label: 'Gradient Đến', default: '#f59e0b' },
                gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' }
              }
            }
          }
        },
        description: {
          type: 'object',
          label: 'Description',
          objectFields: {
            text: { type: 'textarea', label: 'Nội dung', contentEditable: true },
            color: { type: 'text', label: 'Màu Description', default: '#ffffff' },
            size: { type: 'text', label: 'Cỡ Description', default: '14px' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
          }
        },
        button: {
          type: 'object',
          label: 'Cấu hình nút',
          objectFields: {
            text: { type: 'text', label: 'Chữ trong nút', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ nút', default: '#ffffff' },
            textSize: { type: 'text', label: 'Cỡ chữ nút', default: '16px' },
            weight: { type: 'select', label: 'Độ đậm nút', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }, { label: 'Siêu đậm', value: '900' }] },
            style: { type: 'select', label: 'Kiểu chữ nút', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân nút', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] },
            align: {
              type: 'select', label: 'Vị trí nút',
              options: [
                { label: 'Nằm bên trái', value: 'left' },
                { label: 'Nằm giữa', value: 'center' },
                { label: 'Nằm bên phải', value: 'right' }
              ]
            },
            background: {
              type: 'object', label: 'Nền nút',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại màu',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu nền', default: '#3b82f6' },
                gradientFrom: { type: 'text', label: 'Gradient Từ', default: '#3b82f6' },
                gradientTo: { type: 'text', label: 'Gradient Đến', default: '#1e3a8a' },
                gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' },
                hoverColor: { type: 'text', label: 'Màu Hover', default: "#1e40af" }
              }
            },
            radius: {
              type: 'object',
              label: 'Bo góc nút',
              objectFields: {
                type: {
                  type: 'select', label: 'Kiểu bo góc',
                  options: [
                    { label: 'Bo 4 góc', value: 'all' },
                    { label: 'Bo từng góc', value: 'custom' }
                  ]
                },
                all: { type: 'text', label: 'Bán kính bo 4 góc', default: '9999px' },
                tl: { type: 'text', label: 'Trên - Trái (Từng góc)', default: '9999px' },
                tr: { type: 'text', label: 'Trên - Phải (Từng góc)', default: '9999px' },
                br: { type: 'text', label: 'Dưới - Phải (Từng góc)', default: '9999px' },
                bl: { type: 'text', label: 'Dưới - Trái (Từng góc)', default: '9999px' }
              }
            }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'image_gradient', imageUrl: 'https://webdemo.hexagon.xyz/medias/hieuunghero.webp', color: '#1e3a8a', gradientFrom: '#1e3a8a', gradientTo: '#764ba2', gradientDirection: 'to bottom right' },
        align: 'left',
        blockRadius: { tl: '13px', tr: '90px', br: '13px', bl: '90px' },
        eyebrow: {
          text: 'LAN TỎA GIÁ TRỊ ĐẤT',
          color: '#ffffff',
          size: '14px'
        },
        title: {
          text: 'Sen Hồng',
          size: '60px',
          background: { type: 'color', color: '#fde047', gradientFrom: '#fde047', gradientTo: '#f59e0b', gradientDirection: 'to right' }
        },
        description: {
          text: 'CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần Hợp tác – Đổi mới – Phát triển, CLB đóng vai trò là cầu nối chiến lược, hợp tác, thúc đẩy giá trị kinh doanh và lan tỏa sẻ chia nghĩa tình quê hương.',
          color: '#ffffff',
          size: '14px'
        },
        button: {
          text: 'Tham gia cộng đồng',
          textColor: '#ffffff',
          textSize: '16px',
          align: 'center',
          background: { type: 'color', color: '#3b82f6', gradientFrom: '#3b82f6', gradientTo: '#1e3a8a', gradientDirection: 'to right', hoverColor: '#1e40af' },
          radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }
        }
      },
      render: (props) => <AdminSenHong {...props} />
    },

    CacBan: {
      label: 'Các Ban Chuyên Môn',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: {
          type: 'object', label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            size: { type: 'text', label: 'Cỡ chữ', default: '28px' },
            background: {
              type: 'object', label: 'Màu tiêu đề',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại màu',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu (Hex)', default: '#1e3a8a' },
                gradientFrom: { type: 'text', label: 'Gradient Từ', default: '#1e3a8a' },
                gradientTo: { type: 'text', label: 'Gradient Đến', default: '#3b82f6' },
                gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' }
              }
            }
          }
        },
        subtitle: {
          type: 'object', label: 'Tiêu đề phụ',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            color: { type: 'text', label: 'Màu chữ', default: '#1e3a8a' },
            size: { type: 'text', label: 'Cỡ chữ', default: '14px' }
          }
        },
        cards: {
          type: 'array', label: 'Danh sách các ban',
          arrayFields: {
            background: {
              type: 'object', label: 'Nền khối',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại nền',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu nền', default: '#3b82f6' },
                gradientFrom: { type: 'text', label: 'Gradient từ', default: '#3b82f6' },
                gradientTo: { type: 'text', label: 'Gradient đến', default: '#1e3a8a' },
                gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
                imageUrl: { type: 'text', label: 'URL Ảnh nền' }
              }
            },
            radius: {
              type: 'object', label: 'Bo góc khối',
              objectFields: {
                tl: { type: 'text', label: 'Trên - Trái', default: '60px' },
                tr: { type: 'text', label: 'Trên - Phải', default: '0px' },
                br: { type: 'text', label: 'Dưới - Phải', default: '60px' },
                bl: { type: 'text', label: 'Dưới - Trái', default: '0px' }
              }
            },
            iconType: {
              type: 'select', label: 'Loại Icon',
              options: [
                { label: 'URL (Ảnh/Icon) / File', value: 'image' },
                { label: 'Mã SVG', value: 'svg' }
              ]
            },
            iconUrl: { type: 'text', label: 'URL hoặc đường dẫn file' },
            iconSvg: { type: 'text', label: "Nhập mã <svg> vào đây" },
            title: { type: 'text', label: 'Tên Ban', contentEditable: true },
            titleColor: { type: 'text', label: 'Màu Tên Ban', default: '#fde047' },
            titleSize: { type: 'text', label: 'Cỡ chữ Tên Ban', default: '16px' },
            button: {
              type: 'object', label: 'Cấu hình nút',
              objectFields: {
                text: { type: 'text', label: 'Chữ trong nút', contentEditable: true },
                textColor: { type: 'text', label: 'Màu chữ', default: '#ffffff' },
                textSize: { type: 'text', label: 'Cỡ chữ', default: '12px' },
                background: {
                  type: 'object', label: 'Nền nút',
                  objectFields: {
                    type: {
                      type: 'select', label: 'Loại màu',
                      options: [
                        { label: 'Màu sắc', value: 'color' },
                        { label: 'Gradient', value: 'gradient' },
                        { label: 'Hình ảnh', value: 'image' },
                        { label: 'Ảnh & Gradient', value: 'image_gradient' },
                        { label: 'Ảnh & Màu sắc', value: 'image_color' }
                      ]
                    },
                    color: { type: 'text', label: 'Màu nền', default: 'transparent' },
                    gradientFrom: { type: 'text', label: 'Gradient Từ', default: 'transparent' },
                    gradientTo: { type: 'text', label: 'Gradient Đến', default: 'transparent' },
                    gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' },
                    hoverColor: { type: 'text', label: 'Màu Hover', default: "rgba(255,255,255,0.1)" }
                  }
                },
                radius: {
                  type: 'object', label: 'Bo góc nút',
                  objectFields: {
                    tl: { type: 'text', label: 'Trên - Trái', default: '9999px' },
                    tr: { type: 'text', label: 'Trên - Phải', default: '9999px' },
                    br: { type: 'text', label: 'Dưới - Phải', default: '9999px' },
                    bl: { type: 'text', label: 'Dưới - Trái', default: '9999px' }
                  }
                },
                border: {
                  type: 'object', label: 'Viền nút',
                  objectFields: {
                    style: { type: 'select', label: 'Kiểu viền', options: [{ label: 'Không', value: 'none' }, { label: 'Solid', value: 'solid' }] },
                    width: { type: 'text', label: 'Độ dày', default: '1px' },
                    color: { type: 'text', label: 'Màu viền', default: 'rgba(255,255,255,0.5)' }
                  }
                }
              }
            }
          },
          getItemSummary: (item) => item.title || 'Khối mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'gradient', gradientFrom: "#e6dcf7", gradientTo: "#d1e2fe", gradientDirection: "to bottom" },
        title: {
          text: 'CÁC BAN CHUYÊN MÔN',
          size: '28px',
          background: { type: 'color', color: '#1e3a8a' }
        },
        subtitle: {
          text: 'CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH',
          color: '#1e3a8a',
          size: '14px'
        },
        cards: [
          {
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png',
            title: 'Ban Kinh tế - Đầu tư',
            titleColor: '#ffffff',
            titleSize: '16px',
            background: { type: 'gradient', gradientDirection: 'to bottom ', gradientFrom: '#51ace9', gradientTo: '#245d87' },
            radius: { tl: '60px', tr: '0px', br: '60px', bl: '0px' },
            button: {
              text: 'Xem hoạt động →', textColor: '#ffffff', textSize: '12px',
              background: { type: 'color', color: 'transparent' },
              radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' },
              border: { style: 'solid', width: '1px', color: 'rgba(255,255,255,0.5)' }
            }
          },
          {
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png',
            title: 'Ban Văn hóa - Thể thao',
            titleColor: '#ffffff',
            titleSize: '16px',
            background: { type: 'gradient', gradientDirection: 'to bottom ', gradientFrom: '#51ace9', gradientTo: '#245d87' },
            radius: { tl: '60px', tr: '0px', br: '60px', bl: '0px' },
            button: {
              text: 'Xem hoạt động →', textColor: '#ffffff', textSize: '12px',
              background: { type: 'color', color: 'transparent' },
              radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' },
              border: { style: 'solid', width: '1px', color: 'rgba(255,255,255,0.5)' }
            }
          },
          {
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png',
            title: 'Ban Xã hội - Cộng đồng',
            titleColor: '#ffffff',
            titleSize: '16px',
            background: { type: 'gradient', gradientDirection: 'to bottom ', gradientFrom: '#51ace9', gradientTo: '#245d87' },
            radius: { tl: '60px', tr: '0px', br: '60px', bl: '0px' },
            button: {
              text: 'Xem hoạt động →', textColor: '#ffffff', textSize: '12px',
              background: { type: 'color', color: 'transparent' },
              radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' },
              border: { style: 'solid', width: '1px', color: 'rgba(255,255,255,0.5)' }
            }
          },
          {
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png',
            title: 'Ban Khởi nghiệp',
            titleColor: '#ffffff',
            titleSize: '16px',
            background: { type: 'gradient', gradientDirection: 'to bottom ', gradientFrom: '#51ace9', gradientTo: '#245d87' },
            radius: { tl: '60px', tr: '0px', br: '60px', bl: '0px' },
            button: {
              text: 'Xem hoạt động →', textColor: '#ffffff', textSize: '12px',
              background: { type: 'color', color: 'transparent' },
              radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' },
              border: { style: 'solid', width: '1px', color: 'rgba(255,255,255,0.5)' }
            }
          },
          {
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png',
            title: 'Ban Giao thương quốc tế',
            titleColor: '#ffffff',
            titleSize: '16px',
            background: { type: 'gradient', gradientDirection: 'to bottom ', gradientFrom: '#51ace9', gradientTo: '#245d87' },
            radius: { tl: '60px', tr: '0px', br: '60px', bl: '0px' },
            button: {
              text: 'Xem hoạt động →', textColor: '#ffffff', textSize: '12px',
              background: { type: 'color', color: 'transparent' },
              radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' },
              border: { style: 'solid', width: '1px', color: 'rgba(255,255,255,0.5)' }
            }
          }
        ]
      },
      render: (props) => <AdminCacBan {...props} />
    },

    GioiThieu: {
      label: 'Giới Thiệu / Cơ Cấu',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        cards: {
          type: 'array', label: 'Danh sách Khối',
          arrayFields: {
            cardType: {
              type: 'select', label: 'Loại khối',
              options: [
                { label: 'Văn bản & Ảnh nền', value: 'text' },
                { label: 'Danh sách nhân sự', value: 'people' }
              ]
            },
            background: {
              type: 'object', label: 'Nền khối',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
                gradientFrom: { type: 'text', label: 'Gradient từ', default: '#ffffff' },
                gradientTo: { type: 'text', label: 'Gradient đến', default: '#f8fafc' },
                gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom' }
              }
            },
            radius: {
              type: 'object', label: 'Bo góc khối',
              objectFields: {
                tl: { type: 'text', label: 'Trên - Trái', default: '16px' },
                tr: { type: 'text', label: 'Trên - Phải', default: '16px' },
                br: { type: 'text', label: 'Dưới - Phải', default: '16px' },
                bl: { type: 'text', label: 'Dưới - Trái', default: '16px' }
              }
            },
            title: {
              type: 'object', label: 'Tiêu đề khối',
              objectFields: {
                text: { type: 'text', label: 'Tiêu đề', contentEditable: true },
                color: { type: 'text', label: 'Màu chữ', default: '#111827' },
                size: { type: 'text', label: 'Cỡ chữ', default: '20px' }
              }
            },
            textContents: {
              type: 'array', label: 'Các đoạn văn bản (Khối Văn bản)',
              arrayFields: {
                content: { type: 'textarea', label: 'Nội dung', contentEditable: true },
                color: { type: 'text', label: 'Màu chữ', default: '#4b5563' },
                size: { type: 'text', label: 'Cỡ chữ', default: '15px' },
                weight: {
                  type: 'select', label: 'Độ đậm',
                  options: [
                    { label: 'Bình thường', value: 'normal' },
                    { label: 'In đậm', value: 'bold' }
                  ]
                }
              },
              getItemSummary: (item) => item?.content?.substring(0, 20) || 'Đoạn văn mới'
            },
            bottomImage: { type: 'text', label: 'URL Ảnh góc dưới (Khối Văn bản)' },
            introText: {
              type: 'object', label: 'Lời giới thiệu (Khối Nhân sự)',
              objectFields: {
                text: { type: 'textarea', label: 'Nội dung', contentEditable: true },
                color: { type: 'text', label: 'Màu chữ', default: '#4b5563' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' }
              }
            },
            memberLabels: {
              type: 'object', label: 'Cấu hình Nhãn Thông tin',
              objectFields: {
                labelColor: { type: 'text', label: 'Màu chữ Nhãn', default: '#1f2937' },
                valueColor: { type: 'text', label: 'Màu chữ Nội dung', default: '#4b5563' },
                textSize: { type: 'text', label: 'Cỡ chữ chung', default: '13px' },
                lbl1: { type: 'text', label: 'Tên nhãn 1', default: 'Họ tên:', contentEditable: true },
                lbl2: { type: 'text', label: 'Tên nhãn 2', default: 'Chức vụ CLB:', contentEditable: true },
                lbl3: { type: 'text', label: 'Tên nhãn 3', default: 'Chức vụ DN:', contentEditable: true },
                lbl4: { type: 'text', label: 'Tên nhãn 4', default: 'Doanh nghiệp:', contentEditable: true }
              }
            },
            members: {
              type: 'array', label: 'Danh sách nhân sự',
              arrayFields: {
                avatar: { type: 'text', label: 'URL Avatar' },
                val1: { type: 'text', label: 'Thông tin 1 (Họ tên)', contentEditable: true },
                val2: { type: 'text', label: 'Thông tin 2', contentEditable: true },
                val3: { type: 'text', label: 'Thông tin 3', contentEditable: true },
                val4: { type: 'text', label: 'Thông tin 4', contentEditable: true }
              },
              getItemSummary: (item) => item?.val1 || 'Nhân sự mới'
            }
          },
          getItemSummary: (item) => item?.title?.text || (item?.cardType === 'text' ? 'Khối Văn bản' : 'Khối Nhân sự')
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'gradient', gradientFrom: '#f3e8ff', gradientTo: '#eef2ff', gradientDirection: 'to right' },
        cards: [
          {
            cardType: 'text',
            background: { type: 'color', color: '#ffffff' },
            radius: { tl: '16px', tr: '16px', br: '16px', bl: '16px' },
            title: { text: 'VỀ CÂU LẠC BỘ', color: '#111827', size: '20px' },
            textContents: [
              { content: 'CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn tỉnh.', color: '#4b5563', size: '15px', weight: 'normal' },
              { content: 'Với tinh thần kết nối - đồng hành - sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.', color: '#4b5563', size: '15px', weight: 'normal' }
            ],
            bottomImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop'
          },
          {
            cardType: 'people',
            background: { type: 'color', color: '#ffffff' },
            radius: { tl: '16px', tr: '16px', br: '16px', bl: '16px' },
            title: { text: 'CƠ CẤU TỔ CHỨC', color: '#111827', size: '20px' },
            introText: { text: 'Danh sách ban chấp hành nhiệm kỳ mới:', color: '#4b5563', size: '14px' },
            memberLabels: { labelColor: '#1f2937', valueColor: '#4b5563', textSize: '13px', lbl1: 'Họ tên:', lbl2: 'Chức vụ CLB:', lbl3: 'Chức vụ DN:', lbl4: 'Doanh nghiệp:' },
            members: [
              { avatar: 'https://i.pravatar.cc/150?u=1', val1: 'Trần Văn Khang', val2: 'Ủy viên BCH', val3: 'Tổng Giám đốc', val4: 'Công ty CP Logistics Đồng Tháp' },
              { avatar: 'https://i.pravatar.cc/150?u=2', val1: 'Đỗ Thu Trang', val2: 'Thủ quỹ CLB', val3: 'Giám đốc Tài chính', val4: 'Công ty TNHH Sen Việt' },
              { avatar: 'https://i.pravatar.cc/150?u=3', val1: 'Vũ Hoàng Long', val2: 'Ủy viên BCH', val3: 'Giám đốc Điều hành', val4: 'Công ty Công nghệ số Mekong' },
              { avatar: 'https://i.pravatar.cc/150?u=4', val1: 'Nguyễn Văn A', val2: 'Thành viên', val3: 'Giám đốc', val4: 'Công ty ABC' }
            ]
          }
        ]
      },
      render: (props) => <AdminGioiThieu {...props} />
    },
    Header: {
      label: 'Header (Menu)',
      defaultProps: {
        sectionId: '', 
        logoUrl: '/logo.png',
        showLogoText: true,
        logoTitle: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
        logoDescription: 'Tại TP.Hồ Chí Minh',
        langOptions: [
          { langCode: 'vi', label: 'VN', flagUrl: 'https://flagcdn.com/w20/vn.png' },
          { langCode: 'en', label: 'EN', flagUrl: 'https://flagcdn.com/w20/gb.png' }
        ],
        navItems: [
          { label: 'Trang chủ', url: '#' },
          { label: 'Về chúng tôi', url: '#' }
        ]
      },
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        logoUrl: { type: 'text', label: 'URL Logo' },
        showLogoText: {
          type: 'radio',
          label: 'Hiển thị chữ cạnh Logo?',
          options: [
            { label: 'Có', value: true },
            { label: 'Không', value: false }
          ]
        },
        logoTitle: { type: 'text', label: 'Tiêu đề Logo' },
        logoDescription: { type: 'text', label: 'Mô tả Logo' },
        langOptions: {
          type: 'array',
          label: 'Các nút chọn Ngôn ngữ',
          arrayFields: {
            langCode: { type: 'select', label: 'Hệ thống xử lý (Mã NN)', options: langCodeOptions },
            flagUrl: { type: 'text', label: 'Link Icon Lá cờ (tuỳ chọn)' },
            label: { type: 'text', label: 'Tên nút (VN, EN,...)' }
          }
        },
        navItems: {
          type: 'array',
          label: 'Menu Điều hướng',
          arrayFields: {
            label: { type: 'text', label: 'Tên Menu' },
            url: { type: 'text', label: 'Đường dẫn (URL) - Dùng nếu không phải Mega Menu' },
            isMegaMenu: {
              type: 'radio',
              label: 'Là Mega Menu?',
              options: [
                { label: 'Không', value: false },
                { label: 'Có', value: true }
              ]
            },
            subLinks: {
              type: 'array',
              label: 'Danh sách liên kết con (Mega Menu)',
              arrayFields: {
                columnTitle: { type: 'text', label: 'Tên nhóm/cột (ví dụ: Về CLB)' },
                label: { type: 'text', label: 'Tên liên kết' },
                url: { type: 'text', label: 'Đường dẫn liên kết' },
                description: { type: 'text', label: 'Mô tả ngắn' }
              },
              getItemSummary: (item) => `${item.columnTitle || 'Chưa phân nhóm'} - ${item.label || 'Chưa đặt tên'}`
            }
          },
          getItemSummary: (item) => item.label || 'Menu mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        logoUrl: '/logo.png',
        showLogoText: true,
        logoTitle: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
        logoDescription: 'Tại TP.Hồ Chí Minh',
        navItems: [
          { label: 'Trang chủ', url: '#', isMegaMenu: false },
          {
            label: 'Giới thiệu',
            url: '#',
            isMegaMenu: true,
            subLinks: [
              { columnTitle: 'VỀ CÂU LẠC BỘ', label: 'Giới thiệu chung', url: '#', description: 'Lịch sử hình thành và sứ mệnh' },
              { columnTitle: 'VỀ CÂU LẠC BỘ', label: 'Ban chấp hành', url: '#', description: 'Đội ngũ lãnh đạo CLB nhiệm kỳ mới' },
              { columnTitle: 'VỀ CÂU LẠC BỘ', label: 'Quy chế hoạt động', url: '#', description: 'Các quy định chính thức của hội' },
              { columnTitle: 'ĐỐI TÁC & HOẠT ĐỘNG', label: 'Hợp tác quốc tế', url: '#', description: 'Các dự án kết nối toàn cầu' },
              { columnTitle: 'ĐỐI TÁC & HOẠT ĐỘNG', label: 'Hoạt động xã hội', url: '#', description: 'Chương trình thiện nguyện vì cộng đồng' }
            ]
          },
          { label: 'Hội viên', url: '#', isMegaMenu: false },
          { label: 'Hoạt động ban', url: '#', isMegaMenu: false },
          { label: 'Tin tức & Sự kiện', url: '#', isMegaMenu: false },
          { label: 'Liên hệ', url: '#', isMegaMenu: false }
        ]
      },
      render: (props) => <AdminHeader {...props} />
    },

    HoiVien: {
      label: 'Hội Viên',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: {
          type: 'object', label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            size: { type: 'text', label: 'Cỡ chữ', default: '28px' },
            background: {
              type: 'object', label: 'Màu tiêu đề',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại màu',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu (Hex)', default: '#1e3a8a' },
                gradientFrom: { type: 'text', label: 'Gradient Từ', default: '#1e3a8a' },
                gradientTo: { type: 'text', label: 'Gradient Đến', default: '#0284c7' },
                gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' }
              }
            }
          }
        },
        logoRadius: {
          type: 'object', label: 'Bo góc nền logo',
          objectFields: {
            tl: { type: 'text', label: 'Trên - Trái', default: '16px' },
            tr: { type: 'text', label: 'Trên - Phải', default: '16px' },
            br: { type: 'text', label: 'Dưới - Phải', default: '16px' },
            bl: { type: 'text', label: 'Dưới - Trái', default: '16px' }
          }
        },
        logos: {
          type: 'array', label: 'Danh sách Logo hội viên',
          arrayFields: {
            logoUrl: {
              type: 'custom',
              label: 'Ảnh Logo',
              render: (props) => <ImageField {...props} />
            },
            alt: { type: 'text', label: 'Tên hội viên / Alt text' },
            link: { type: 'text', label: 'Đường dẫn liên kết' }
          },
          getItemSummary: (item) => item.alt || 'Hội viên mới'
        },
        scroll: {
          type: 'object', label: 'Hiệu ứng cuộn',
          objectFields: {
            direction: { type: 'select', label: 'Chiều cuộn', options: [{ label: 'Phải sang trái', value: 'left' }, { label: 'Trái sang phải', value: 'right' }] },
            speed: { type: 'text', label: 'Tốc độ (VD: 20s, 15s)', default: '20s' }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'gradient', gradientFrom: '#bae6fd', gradientTo: '#f0f9ff', gradientDirection: 'to bottom' },
        title: {
          text: 'Hội Viên CLB Doanh Nhân Đồng Tháp Tại TP. Hồ Chí Minh',
          size: '26px',
          background: { type: 'color', color: '#1e3a8a' }
        },
        logoRadius: { tl: '16px', tr: '16px', br: '16px', bl: '16px' },
        scroll: { direction: 'left', speed: '20s' },
        logos: [
          { logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop&text=HAPPYFOOD', alt: 'HAPPYFOOD', link: '#' },
          { logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop&text=ECOBOOK', alt: 'ECOBOOK', link: '#' },
          { logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop&text=COMOON', alt: 'COMOON', link: '#' }
        ]
      },
      render: (props) => <AdminHoiVien {...props} />
    },

    HanhTrinh: {
      label: 'Hành Trình',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: {
          type: 'object',
          label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            size: { type: 'text', label: 'Kích thước chữ', default: '28px' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
            style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] },
            background: {
              type: 'object', label: 'Màu tiêu đề',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại màu',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' },
                    { label: 'Hình ảnh', value: 'image' },
                    { label: 'Ảnh & Gradient', value: 'image_gradient' },
                    { label: 'Ảnh & Màu sắc', value: 'image_color' }
                  ]
                },
                color: { type: 'text', label: 'Màu (Hex)', default: '#1e3a8a' },
                gradientFrom: { type: 'text', label: 'Gradient Từ', default: '#1e3a8a' },
                gradientTo: { type: 'text', label: 'Gradient Đến', default: '#3b82f6' },
                gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' }
              }
            }
          }
        },
        alignItems: {
          type: 'select', label: 'Căn lề danh sách',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        },
        items: {
          type: 'array',
          label: 'Danh sách mục',
          defaultItemProps: {
            numberValue: '100',
            suffix: '+',
            description: 'Mục mới thêm',
            numberConfig: { color: '#1e3a8a', size: '48px', weight: 'bold', style: 'normal', decoration: 'none' },
            descConfig: { color: '#1e3a8a', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            numberValue: { type: 'text', label: 'Số (để đếm)', contentEditable: true },
            suffix: { type: 'text', label: 'Ký tự sau số (vd: +)', contentEditable: true },

            numberConfig: {
              type: 'object',
              label: 'Định dạng Số',
              objectFields: {
                color: { type: 'text', label: 'Màu số', default: '#1e3a8a' },
                size: { type: 'text', label: 'Cỡ số', default: '48px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }, { label: 'Siêu đậm', value: '900' }] },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            },

            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            descConfig: {
              type: 'object',
              label: 'Định dạng Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu mô tả', default: '#1e3a8a' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            }
          },
          getItemSummary: (item) => (item.numberValue || '') + (item.suffix || '')
        }
      },
      defaultProps: {
        sectionId: '', 
        alignItems: 'center',
        background: { type: 'image_gradient', imageUrl: 'https://webdemo.hexagon.xyz/medias/hoa.webp', gradientFrom: '#e0e7ff', gradientTo: '#f3e8ff', gradientDirection: 'to bottom right' },
        title: {
          text: 'HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ', size: '28px', weight: 'bold',
          background: { type: 'color', color: '#1e3a8a', gradientFrom: '#1e3a8a', gradientTo: '#3b82f6', gradientDirection: 'to right' }
        },
        items: [
          {
            numberValue: '500', suffix: '+', description: 'Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM',
            numberConfig: { color: '#1e3a8a', size: '48px', weight: '900' },
            descConfig: { color: '#1e3a8a', size: '14px', weight: 'bold' }
          },
          {
            numberValue: '20', suffix: '+', description: 'Năm hình thành và phát triển mạng lưới kết nối đồng hương',
            numberConfig: { color: '#1e3a8a', size: '48px', weight: '900' },
            descConfig: { color: '#1e3a8a', size: '14px', weight: 'bold' }
          },
          {
            numberValue: '1000', suffix: '+', description: 'Cơ hội giao thương và kết nối đầu tư được khởi tạo mỗi năm',
            numberConfig: { color: '#1e3a8a', size: '48px', weight: '900' },
            descConfig: { color: '#1e3a8a', size: '14px', weight: 'bold' }
          },
          {
            numberValue: '100', suffix: '+', description: 'Chương trình thiện nguyện và hoạt động hướng về quê hương',
            numberConfig: { color: '#1e3a8a', size: '48px', weight: '900' },
            descConfig: { color: '#1e3a8a', size: '14px', weight: 'bold' }
          }
        ]
      },
      render: (props) => <AdminHanhTrinh {...props} />
    },

    GiaTri: {
      label: 'Giá Trị',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: {
          type: 'object', label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            size: { type: 'text', label: 'Kích thước chữ', default: '28px' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }, { label: 'Siêu đậm', value: '900' }] },
            style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
            decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] },
            background: {
              type: 'object', label: 'Màu tiêu đề',
              objectFields: {
                type: { type: 'select', label: 'Loại màu', options: [{ label: 'Màu sắc', value: 'color' }, { label: 'Gradient', value: 'gradient' }, { label: 'Hình ảnh', value: 'image' }, { label: 'Ảnh & Gradient', value: 'image_gradient' }, { label: 'Ảnh & Màu sắc', value: 'image_color' }] },
                color: { type: 'text', label: 'Màu (Hex)', default: '#1e3a8a' },
                gradientFrom: { type: 'text', label: 'Gradient Từ', default: '#1e3a8a' },
                gradientTo: { type: 'text', label: 'Gradient Đến', default: '#3b82f6' },
                gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to right' }
              }
            }
          }
        },
        button: {
          type: 'object', label: 'Nút Xem Thêm',
          objectFields: {
            text: { type: 'text', label: 'Nội dung nút', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' },
            textConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#1e3a8a' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            }
          }
        },
        alignItems: {
          type: 'select', label: 'Căn lề danh sách',
          options: [
            { label: 'Trái', value: 'left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Phải', value: 'right' }
          ]
        },
        items: {
          type: 'array', label: 'Danh sách mục',
          defaultItemProps: {
            imageUrl: 'https://webdemo.hexagon.xyz/medias/icon_1%201-2.png',
            radius: { type: 'custom', tl: '70px', tr: '15px', br: '70px', bl: '15px' },
            title: 'Tiêu đề mới',
            description: 'Mô tả giá trị khi tham gia cộng đồng.',
            titleConfig: { color: '#0b4c8c', size: '15px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
            descConfig: { color: '#4b5563', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            imageUrl: { type: 'custom', label: 'Ảnh Icon', render: (props) => <ImageField {...props} /> },
            radius: {
              type: 'object', label: 'Bo góc thẻ',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Bo 4 góc', value: 'all' }, { label: 'Bo từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo tất cả', default: '24px' },
                tl: { type: 'text', label: 'Trên - Trái', default: '70px' },
                tr: { type: 'text', label: 'Trên - Phải', default: '15px' },
                br: { type: 'text', label: 'Dưới - Phải', default: '70px' },
                bl: { type: 'text', label: 'Dưới - Trái', default: '15px' }
              }
            },
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            description: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
            titleConfig: {
              type: 'object', label: 'Định dạng Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0b4c8c' },
                size: { type: 'text', label: 'Cỡ chữ', default: '15px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }, { label: 'Siêu đậm', value: '900' }] },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            },
            descConfig: {
              type: 'object', label: 'Định dạng Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#4b5563' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }] }
              }
            }
          },
          getItemSummary: (item) => item.title || 'Mục mới'
        }
      },
      defaultProps: {
        sectionId: '', 
        alignItems: 'left',
        background: { type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/bg-giatri.png' },
        title: { text: 'GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG', size: '24px', weight: '900', background: { type: 'color', color: '#0b4c8c' } },
        button: { text: 'Xem thêm', url: '#', textConfig: { color: '#0b4c8c', size: '14px', weight: 'bold' } },
        items: [
          {
            imageUrl: 'https://webdemo.hexagon.xyz/medias/icon_1%201-2.png', radius: { type: 'custom', tl: '70px', tr: '15px', br: '70px', bl: '15px' }, title: 'Kết nối chất lượng', description: 'Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.',
            titleConfig: { color: '#0b4c8c', size: '15px', weight: 'bold' }, descConfig: { color: '#4b5563', size: '14px', weight: 'normal' }
          },
          {
            imageUrl: 'https://webdemo.hexagon.xyz/medias/icon_1%201-1.png', radius: { type: 'custom', tl: '70px', tr: '15px', br: '70px', bl: '15px' }, title: 'Phát triển kiến thức', description: 'Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.',
            titleConfig: { color: '#0b4c8c', size: '15px', weight: 'bold' }, descConfig: { color: '#4b5563', size: '14px', weight: 'normal' }
          },
          {
            imageUrl: 'https://webdemo.hexagon.xyz/medias/icon_1%201.png', radius: { type: 'custom', tl: '70px', tr: '15px', br: '70px', bl: '15px' }, title: 'Cơ hội hợp tác', description: 'Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.',
            titleConfig: { color: '#0b4c8c', size: '15px', weight: 'bold' }, descConfig: { color: '#4b5563', size: '14px', weight: 'normal' }
          }
        ]
      },
      render: (props) => <AdminGiaTri {...props} />
    },

    QuanTam: {
      label: 'Quan Tâm (Liên hệ)',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        title: {
          type: 'object', label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'textarea', label: 'Nội dung tiêu đề', contentEditable: true },
            color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
            size: { type: 'text', label: 'Cỡ chữ', default: '24px' },
            weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }, { label: 'Rất đậm', value: '900' }] }
          }
        },
        email: {
          type: 'object', label: 'Email',
          objectFields: {
            text: { type: 'text', label: 'Email', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn (mailto:)' },
            radius: {
              type: 'object', label: 'Bo góc thẻ',
              objectFields: {
                tl: { type: 'text', label: 'Trái trên', default: '9999px' },
                tr: { type: 'text', label: 'Phải trên', default: '9999px' },
                br: { type: 'text', label: 'Phải dưới', default: '9999px' },
                bl: { type: 'text', label: 'Trái dưới', default: '9999px' }
              }
            },
            textConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
              }
            }
          }
        },
        phone: {
          type: 'object', label: 'Điện thoại',
          objectFields: {
            text: { type: 'text', label: 'Số điện thoại', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn (tel:)' },
            radius: {
              type: 'object', label: 'Bo góc thẻ',
              objectFields: {
                tl: { type: 'text', label: 'Trái trên', default: '9999px' },
                tr: { type: 'text', label: 'Phải trên', default: '9999px' },
                br: { type: 'text', label: 'Phải dưới', default: '9999px' },
                bl: { type: 'text', label: 'Trái dưới', default: '9999px' }
              }
            },
            textConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
              }
            }
          }
        },
        button: {
          type: 'object', label: 'Nút hành động',
          objectFields: {
            text: { type: 'text', label: 'Nội dung nút', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' },
            radius: {
              type: 'object', label: 'Bo góc nút',
              objectFields: {
                tl: { type: 'text', label: 'Trái trên', default: '9999px' },
                tr: { type: 'text', label: 'Phải trên', default: '9999px' },
                br: { type: 'text', label: 'Phải dưới', default: '9999px' },
                bl: { type: 'text', label: 'Trái dưới', default: '9999px' }
              }
            },
            textConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#ffffff' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }] }
              }
            }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'image', imageUrl: 'https://webdemo.hexagon.xyz/medias/bg-lienhe.png' },
        title: { text: 'QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM', size: '24px', weight: 'bold', color: '#0368B0' },
        email: { text: 'info@dte.hunghau.vn', url: 'mailto:info@dte.hunghau.vn', radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }, textConfig: { color: '#0368B0', size: '16px', weight: 'bold' } },
        phone: { text: '1800 1568', url: 'tel:1800 1568', radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }, textConfig: { color: '#0368B0', size: '16px', weight: 'bold' } },
        button: { text: 'Đăng ký hội viên', url: '#', radius: { tl: '9999px', tr: '9999px', br: '9999px', bl: '9999px' }, textConfig: { color: '#ffffff', size: '16px', weight: 'bold' } }
      },
      render: (props) => <AdminQuanTam {...props} />
    },

    Footer: {
      label: 'Footer',
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'custom', label: 'Background',
          render: (props) => <AdminBackgroundField {...props} />
        },
        logo: {
          type: 'object', label: 'Logo',
          objectFields: {
            type: { type: 'select', label: 'Kiểu Logo', options: [{ label: 'Chỉ hình ảnh', value: 'logo_only' }, { label: 'Hình ảnh + Chữ', value: 'logo_text' }] },
            imageUrl: { type: 'custom', label: 'Ảnh Logo', render: (props) => <ImageField {...props} /> },
            text1: { type: 'text', label: 'Dòng chữ 1', contentEditable: true },
            text2: { type: 'text', label: 'Dòng chữ 2', contentEditable: true },
            url: { type: 'text', label: 'Đường dẫn' },
            textConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch dưới', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        contact: {
          type: 'object', label: 'Thông tin liên hệ',
          objectFields: {
            title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
            titleConfig: {
              type: 'object', label: 'Định dạng Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '18px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch dưới', value: 'underline' }], default: 'none' }
              }
            },
            address: { type: 'textarea', label: 'Địa chỉ', contentEditable: true },
            email: { type: 'text', label: 'Email', contentEditable: true },
            phone: { type: 'text', label: 'Hotline', contentEditable: true },

            textConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch dưới', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        columns: {
          type: 'array', label: 'Các cột liên kết',
          defaultItemProps: {
            title: 'Cột mới',
            titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
            linkConfig: { color: '#0368B0', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' },
            links: [{ text: 'Liên kết mới', url: '#' }]
          },
          arrayFields: {
            title: { type: 'text', label: 'Tên cột', contentEditable: true },
            titleConfig: {
              type: 'object', label: 'Định dạng Tiêu đề cột',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '18px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch dưới', value: 'underline' }], default: 'none' }
              }
            },
            linkConfig: {
              type: 'object', label: 'Định dạng liên kết (áp dụng cho tất cả liên kết dưới đây)',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch dưới', value: 'underline' }], default: 'none' }
              }
            },
            links: {
              type: 'array', label: 'Danh sách liên kết',
              defaultItemProps: { text: 'Liên kết mới', url: '#' },
              arrayFields: {
                text: { type: 'text', label: 'Tên liên kết', contentEditable: true },
                url: { type: 'text', label: 'Đường dẫn' }
              },
              getItemSummary: (item) => item.text || 'Liên kết mới'
            }

          },
          getItemSummary: (item) => item.title || 'Cột mới'
        },
        bottomBar: {
          type: 'object', label: 'Thanh dưới cùng',
          objectFields: {
            copyright: { type: 'text', label: 'Bản quyền', contentEditable: true },
            copyrightConfig: {
              type: 'object', label: 'Định dạng chữ',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#ffffff' },
                size: { type: 'text', label: 'Cỡ chữ', default: '14px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch dưới', value: 'underline' }], default: 'none' }
              }
            },
            socials: {
              type: 'array', label: 'Mạng xã hội',
              defaultItemProps: { iconUrl: 'https://webdemo.hexagon.xyz/medias/facebook.svg', alt: 'social', url: '#' },
              arrayFields: {
                iconUrl: { type: 'custom', label: 'Icon', render: (props) => <ImageField {...props} /> },
                alt: { type: 'text', label: 'Tên mạng xã hội (alt)' },
                url: { type: 'text', label: 'Đường dẫn' }
              },
              getItemSummary: (item) => 'Social Link'
            }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'image_gradient', imageUrl: 'https://webdemo.hexagon.xyz/medias/hieuungfooter.webp', gradientFrom: '#e8b4f8', gradientTo: '#6a7be8', gradientDirection: 'to bottom' },
        logo: {
          type: 'logo_text',
          imageUrl: '/logo.png',
          text1: 'CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP',
          text2: 'TẠI TP. HỒ CHÍ MINH',
          url: '/',
          textConfig: { color: '#0368B0', size: '16px', weight: 'bold', style: 'normal', decoration: 'none' }
        },
        contact: {
          title: 'TRỤ SỞ CHÍNH',
          address: 'Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh',
          email: 'info@dte.hunghau.vn',
          phone: '1800 1568',
          titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
          textConfig: { color: '#0368B0', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' }
        },
        columns: [
          {
            title: 'Liên kết trang',
            links: [
              { text: 'Trang chủ', url: '/' },
              { text: 'Tin tức và sự kiện', url: '#' },
              { text: 'Về chúng tôi', url: '#' },
              { text: 'Các lĩnh vực hoạt động', url: '#' },
              { text: 'Doanh nghiệp hội viên', url: '#' },
              { text: 'Đăng kí', url: '#' },
              { text: 'Hoạt động Ban', url: '#' }
            ],
            titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
            linkConfig: { color: '#0368B0', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          {
            title: 'Khác',
            links: [
              { text: 'MYH', url: '#' },
              { text: 'MYC', url: '#' },
              { text: 'HHF', url: '#' },
              { text: 'HHE', url: '#' },
              { text: 'HHA', url: '#' },
              { text: 'COWE', url: '#' },
              { text: 'HIIN', url: '#' },
              { text: 'HYV', url: '#' }
            ],
            titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
            linkConfig: { color: '#0368B0', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' }
          }
        ],
        bottomBar: {
          copyright: 'Copyright © CLB Doanh nhân Đồng Tháp. All rights reserved',
          copyrightConfig: { color: '#ffffff', size: '14px', weight: 'normal', style: 'normal', decoration: 'none' },
          socials: [
            { iconUrl: 'https://webdemo.hexagon.xyz/medias/facebook.svg', alt: 'facebook', url: '#' },
            { iconUrl: 'https://webdemo.hexagon.xyz/medias/tiktok.png', alt: 'tiktok', url: '#' },
            { iconUrl: 'https://webdemo.hexagon.xyz/medias/youtube.png', alt: 'youtube', url: '#' },
            { iconUrl: 'https://webdemo.hexagon.xyz/medias/linkedin.svg', alt: 'linkedin', url: '#' }
          ]
        }
      },
      render: (props) => <AdminFooter {...props} />
    },
    GioiThieuDoanhNhan: {
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'object', label: 'Cấu hình nền',
          objectFields: {
            type: { type: 'select', label: 'Loại nền', options: [{ label: 'Màu sắc', value: 'color' }, { label: 'Hình ảnh', value: 'image' }, { label: 'Hình ảnh & Màu', value: 'image_color' }, { label: 'Hình ảnh & Gradient', value: 'image_gradient' }, { label: 'Gradient', value: 'gradient' }] },
            color: { type: 'text', label: 'Mã màu', default: '#ffffff' },
            imageUrl: { type: 'text', label: 'URL Hình ảnh', default: '' },
            gradientFrom: { type: 'text', label: 'Màu Gradient (Từ)', default: '' },
            gradientTo: { type: 'text', label: 'Màu Gradient (Đến)', default: '' },
            gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to bottom right' }
          }
        },
        title: {
          type: 'object', label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', default: 'GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP' },
            config: {
              type: 'object', label: 'Định dạng Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '32px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        image: {
          type: 'object', label: 'Hình ảnh',
          objectFields: {
            url: { type: 'text', label: 'Đường dẫn ảnh', default: 'https://webdemo.hexagon.xyz/medias/2513.jpg' },
            alt: { type: 'text', label: 'Mô tả ảnh (SEO)', default: 'Giới thiệu' },
            radius: {
              type: 'object', label: 'Bo góc ảnh',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả 4 góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo góc (Tất cả)', default: '8px' },
                tl: { type: 'text', label: 'Góc trên trái', default: '8px' },
                tr: { type: 'text', label: 'Góc trên phải', default: '8px' },
                br: { type: 'text', label: 'Góc dưới phải', default: '8px' },
                bl: { type: 'text', label: 'Góc dưới trái', default: '8px' }
              }
            }
          }
        },
        subtitle: {
          type: 'object', label: 'Tiêu đề phụ',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', default: 'Kết nối – Đồng hành – Phát triển' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '24px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        paragraphs: {
          type: 'array', label: 'Các đoạn văn bản',
          getItemSummary: (item) => item.text || 'Đoạn văn',
          defaultItemProps: {
            text: 'Nhập nội dung đoạn văn...',
            config: { color: '#666666', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            text: { type: 'textarea', label: 'Nội dung' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#666666' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        quotes: {
          type: 'array', label: 'Hộp trích dẫn (Tầm nhìn, Sứ mệnh)',
          getItemSummary: (item) => item.label || 'Trích dẫn',
          defaultItemProps: {
            label: 'Tiêu đề', text: 'Nội dung',
            config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            label: { type: 'text', label: 'Tiêu đề in đậm (VD: Tầm nhìn)' },
            text: { type: 'textarea', label: 'Nội dung' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#333333' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        stats: {
          type: 'array', label: 'Hành trình / Số liệu',
          getItemSummary: (item) => `${item.number}${item.suffix || ''} - ${item.label}`,
          defaultItemProps: {
            number: '100', suffix: '+', label: 'Nhãn',
            numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
            labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            number: { type: 'text', label: 'Số liệu đích (VD: 500)' },
            suffix: { type: 'text', label: 'Hậu tố (VD: +, %)' },
            label: { type: 'text', label: 'Mô tả số liệu' },
            numberConfig: {
              type: 'object', label: 'Định dạng Số',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '36px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            },
            labelConfig: {
              type: 'object', label: 'Định dạng Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#666666' },
                size: { type: 'text', label: 'Cỡ chữ', default: '15px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'color', color: '#ffffff' },
        title: { text: 'GIỚI THIỆU DOANH NHÂN ĐỒNG THÁP', config: { color: '#0368B0', size: '32px', weight: 'bold', style: 'normal', decoration: 'none' } },
        image: { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Doanh nhân', radius: { type: 'all', all: '16px', tl: '0px', tr: '0px', bl: '0px', br: '0px' } },
        subtitle: { text: 'Kết nối – Đồng hành – Phát triển', config: { color: '#0368B0', size: '24px', weight: 'bold', style: 'normal', decoration: 'none' } },
        paragraphs: [
          { text: 'Cộng đồng Doanh nhân Đồng Tháp hướng đến việc xây dựng môi trường kết nối giữa các doanh nghiệp, thúc đẩy hợp tác và tạo ra nhiều giá trị bền vững cho địa phương.', config: { color: '#666666', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { text: 'Với tinh thần đổi mới, sáng tạo và phát triển lâu dài, cộng đồng doanh nhân luôn đóng vai trò quan trọng trong việc thúc đẩy kinh tế, hỗ trợ khởi nghiệp và nâng cao năng lực cạnh tranh.', config: { color: '#666666', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } }
        ],
        quotes: [
          { label: 'Tầm nhìn', text: 'Xây dựng mạng lưới doanh nhân năng động, hiện đại và hội nhập.', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { label: 'Sứ mệnh', text: 'Kết nối doanh nghiệp – chia sẻ tri thức – tạo giá trị phát triển bền vững.', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } }
        ],
        stats: [
          { number: '500', suffix: '+', label: 'Doanh nghiệp tham gia', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { number: '50', suffix: '+', label: 'Sự kiện kết nối mỗi năm', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { number: '100', suffix: '%', label: 'Hướng đến phát triển bền vững', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } }
        ]
      },
      render: (props) => <AdminGioiThieuDoanhNhan {...props} />
    },
    TrangHoiVien: {
      fields: {
        sectionId: { type: 'text', label: 'ID Neo (để menu cuộn tới, vd: tin-tuc)' }, 
        background: {
          type: 'object', label: 'Cấu hình nền',
          objectFields: {
            type: { type: 'select', label: 'Loại nền', options: [{ label: 'Màu sắc', value: 'color' }, { label: 'Hình ảnh', value: 'image' }, { label: 'Hình ảnh & Màu', value: 'image_color' }, { label: 'Hình ảnh & Gradient', value: 'image_gradient' }, { label: 'Gradient', value: 'gradient' }] },
            color: { type: 'text', label: 'Mã màu', default: '#ffffff' },
            imageUrl: { type: 'text', label: 'URL Hình ảnh', default: '' },
            gradientFrom: { type: 'text', label: 'Màu Gradient (Từ)', default: '' },
            gradientTo: { type: 'text', label: 'Màu Gradient (Đến)', default: '' },
            gradientDirection: { type: 'text', label: 'Hướng Gradient', default: 'to bottom right' }
          }
        },
        title: {
          type: 'object', label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', default: 'HỘI VIÊN' },
            config: {
              type: 'object', label: 'Định dạng Tiêu đề',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '32px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        image: {
          type: 'object', label: 'Hình ảnh',
          objectFields: {
            url: { type: 'text', label: 'Đường dẫn ảnh', default: 'https://webdemo.hexagon.xyz/medias/2513.jpg' },
            alt: { type: 'text', label: 'Mô tả ảnh (SEO)', default: 'Hội viên' },
            radius: {
              type: 'object', label: 'Bo góc ảnh',
              objectFields: {
                type: { type: 'select', label: 'Kiểu bo góc', options: [{ label: 'Tất cả 4 góc', value: 'all' }, { label: 'Tùy chỉnh từng góc', value: 'custom' }] },
                all: { type: 'text', label: 'Bo góc (Tất cả)', default: '8px' },
                tl: { type: 'text', label: 'Góc trên trái', default: '8px' },
                tr: { type: 'text', label: 'Góc trên phải', default: '8px' },
                br: { type: 'text', label: 'Góc dưới phải', default: '8px' },
                bl: { type: 'text', label: 'Góc dưới trái', default: '8px' }
              }
            }
          }
        },
        subtitle: {
          type: 'object', label: 'Tiêu đề phụ',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', default: 'Cộng đồng doanh nhân cùng phát triển' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '24px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        paragraphs: {
          type: 'array', label: 'Các đoạn văn bản',
          getItemSummary: (item) => item.text || 'Đoạn văn',
          defaultItemProps: {
            text: 'Nhập nội dung đoạn văn...',
            config: { color: '#666666', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            text: { type: 'textarea', label: 'Nội dung' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#666666' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        benefitsTitle: {
          type: 'object', label: 'Tiêu đề Quyền lợi',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', default: 'Quyền lợi hội viên' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '18px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        benefits: {
          type: 'array', label: 'Danh sách quyền lợi',
          getItemSummary: (item) => item.text || 'Quyền lợi',
          defaultItemProps: {
            text: 'Nội dung quyền lợi',
            config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            text: { type: 'text', label: 'Nội dung' },
            config: {
              type: 'object', label: 'Định dạng',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#333333' },
                size: { type: 'text', label: 'Cỡ chữ', default: '16px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        },
        stats: {
          type: 'array', label: 'Số liệu thống kê',
          getItemSummary: (item) => `${item.number}${item.suffix || ''} - ${item.label}`,
          defaultItemProps: {
            number: '100', suffix: '+', label: 'Nhãn',
            numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' },
            labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' }
          },
          arrayFields: {
            number: { type: 'text', label: 'Số liệu đích (VD: 800)' },
            suffix: { type: 'text', label: 'Hậu tố (VD: +, %)' },
            label: { type: 'text', label: 'Mô tả số liệu' },
            numberConfig: {
              type: 'object', label: 'Định dạng Số',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#0368B0' },
                size: { type: 'text', label: 'Cỡ chữ', default: '36px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'bold' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            },
            labelConfig: {
              type: 'object', label: 'Định dạng Mô tả',
              objectFields: {
                color: { type: 'text', label: 'Màu chữ', default: '#666666' },
                size: { type: 'text', label: 'Cỡ chữ', default: '15px' },
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In đậm', value: 'bold' }], default: 'normal' },
                style: { type: 'select', label: 'Kiểu chữ', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }], default: 'normal' },
                decoration: { type: 'select', label: 'Gạch chân', options: [{ label: 'Không', value: 'none' }, { label: 'Gạch chân', value: 'underline' }], default: 'none' }
              }
            }
          }
        }
      },
      defaultProps: {
        sectionId: '', 
        background: { type: 'color', color: '#ffffff' },
        title: { text: 'HỘI VIÊN', config: { color: '#0368B0', size: '32px', weight: 'bold', style: 'normal', decoration: 'none' } },
        image: { url: 'https://images.unsplash.com/vector-1742570608453-43dc1b4164e5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Hội viên', radius: { type: 'all', all: '16px', tl: '0px', tr: '0px', bl: '0px', br: '0px' } },
        subtitle: { text: 'Cộng đồng doanh nhân cùng phát triển', config: { color: '#0368B0', size: '24px', weight: 'bold', style: 'normal', decoration: 'none' } },
        paragraphs: [
          { text: 'Hội viên là lực lượng nòng cốt tạo nên sự kết nối, chia sẻ và phát triển trong cộng đồng doanh nghiệp Đồng Tháp.', config: { color: '#666666', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { text: 'Việc tham gia hội viên mở ra cơ hội mở rộng mạng lưới, trao đổi kinh nghiệm, tiếp cận chương trình hỗ trợ và đồng hành trong các hoạt động xúc tiến thương mại.', config: { color: '#666666', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } }
        ],
        benefitsTitle: { text: 'Quyền lợi hội viên', config: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' } },
        benefits: [
          { text: 'Tham gia các chương trình kết nối doanh nghiệp', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { text: 'Tiếp cận hoạt động đào tạo và hội thảo chuyên đề', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { text: 'Nhận thông tin thị trường và cơ hội hợp tác', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { text: 'Tham gia các hoạt động cộng đồng doanh nhân', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { text: 'Đồng hành cùng các chương trình phát triển địa phương', config: { color: '#333333', size: '16px', weight: 'normal', style: 'normal', decoration: 'none' } }
        ],
        stats: [
          { number: '800', suffix: '+', label: 'Hội viên', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { number: '120', suffix: '+', label: 'Đối tác', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { number: '40', suffix: '+', label: 'Sự kiện / năm', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } },
          { number: '12', suffix: '', label: 'Nhóm kết nối', numberConfig: { color: '#0368B0', size: '36px', weight: 'bold', style: 'normal', decoration: 'none' }, labelConfig: { color: '#666666', size: '15px', weight: 'normal', style: 'normal', decoration: 'none' } }
        ]
      },
      render: (props) => <AdminTrangHoiVien {...props} />
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
