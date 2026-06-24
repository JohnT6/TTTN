// import React from 'react'; 
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
import ImageField from './components/admin.inlineImage';

//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    Heading: {
      label: 'Tiêu đề',
      fields: {
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
      defaultProps: { content: 'Tiêu đề', level: 2, align: 'left' },
      render: (props) => <AdminHeading {...props} />
    },

    Text: {
      label: 'Văn bản',
      fields: {
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
      defaultProps: { content: 'Nhập văn bản ở đây...', align: 'left' },
      render: (props) => <AdminText {...props} />
    },

    Image: {
      label: 'Ảnh',
      fields: {
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
        src: 'https://via.placeholder.com/800x400',
        alt: 'Ảnh minh họa',
        width: '100%', height: 'auto', borderRadius: '0', align: 'center'
      },
      render: (props) => <AdminImage {...props} />
    },

    Section: {
      label: 'Khoảng (Section)',
      fields: {
        container: {
          type: 'select', label: 'Chiều rộng',
          options: [
            { label: 'Small (640px)', value: 'sm' },
            { label: 'Medium (768px)', value: 'md' },
            { label: 'Large (1024px)', value: 'lg' },
            { label: 'XL (1280px)', value: 'xl' }
          ]
        },
        background: {
          type: 'object', label: 'Background',
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
            fromColor: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            toColor: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            direction: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            bg_image: { type: 'text', label: 'URL ảnh nền' },
            opacity: { type: 'number', label: 'Độ mờ', min: 0, max: 1, step: 0.1, default: 1 }
          }
        },
        padding_x: { type: 'number', label: 'Padding ngang', min: 0, max: 16, default: 4 },
        padding_y: { type: 'number', label: 'Padding dọc', min: 0, max: 16, default: 4 },
        content: { type: 'slot' } // Cho phép nested components
      },
      defaultProps: {
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
        title: { type: 'text', label: 'Tiêu đề', contentEditable: true },
        subtitle: { type: 'textarea', label: 'Mô tả ngắn', contentEditable: true },
        buttons: {
          type: 'array', label: 'Danh sách nút',
          arrayFields: {
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
        background: {
          type: 'object', label: 'Background',
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
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
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
        background: {
          type: 'object', label: 'Background',
          objectFields: {
            type: {
              type: 'select', label: 'Loại nền',
              options: [
                { label: 'Màu sắc', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Hình ảnh', value: 'image' },
                { label: 'Hình ảnh & Màu sắc', value: 'image_color' },
                { label: 'Hình ảnh & Gradient', value: 'image_gradient' }
              ]
            },
            color: { type: 'text', label: 'Màu nền (Mã Hex)', default: '#1e3a8a' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#1e3a8a' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL Ảnh nền / GIF (nếu có)' }
          }
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#eef2ff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#eef2ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#ffffff' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL Ảnh nền' }
          }
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#f5f7fa' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#eef2ff' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#f3e8ff' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom right' },
            imageUrl: { type: 'text', label: 'URL Ảnh nền' }
          }
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
      fields: {
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#e0f2fe' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#bae6fd' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#f0f9ff' },
            gradientDirection: { type: 'text', label: 'Hướng', default: 'to bottom' },
            imageUrl: { type: 'text', label: 'URL Ảnh nền' }
          }
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            imageUrl: { type: 'text', label: 'URL Ảnh nền' }
          }
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            imageUrl: { type: 'text', label: 'URL Ảnh nền' }
          }
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
            titleConfig: { color: '#0b4c8c', size: '15px', weight: 'bold', style: 'normal', decoration: 'none' },
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
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
        background: {
          type: 'object', label: 'Background',
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
            color: { type: 'text', label: 'Màu nền', default: '#ffffff' },
            gradientFrom: { type: 'text', label: 'Gradient từ', default: '#667eea' },
            gradientTo: { type: 'text', label: 'Gradient đến', default: '#764ba2' },
            gradientDirection: { type: 'text', label: 'Hướng gradient', default: 'to right' },
            imageUrl: { type: 'text', label: 'URL ảnh nền' }
          }
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
            titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
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
          titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
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
            titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
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
            titleConfig: { color: '#0368B0', size: '18px', weight: 'bold', style: 'normal', decoration: 'none' },
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
    }
  },



  // Sidebar categories
  categoryGroups: [
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

export default puckConfig;
