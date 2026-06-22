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
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
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
                { label: 'Màu', value: 'color' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Ảnh', value: 'image' }
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
                { label: 'Hình ảnh', value: 'image' }
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
            tl: { type: 'text', label: 'Trên - Trái', default: '13px' },
            tr: { type: 'text', label: 'Trên - Phải', default: '90px' },
            br: { type: 'text', label: 'Dưới - Phải', default: '13px' },
            bl: { type: 'text', label: 'Dưới - Trái', default: '90px' }
          }
        },
        eyebrow: {
          type: 'object',
          label: 'Chữ nhỏ trên cùng',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            color: { type: 'text', label: 'Màu chữ nhỏ', default: '#ffffff' },
            size: { type: 'text', label: 'Cỡ chữ nhỏ', default: '14px' }
          }
        },
        title: {
          type: 'object',
          label: 'Tiêu đề chính',
          objectFields: {
            text: { type: 'text', label: 'Nội dung', contentEditable: true },
            size: { type: 'text', label: 'Kích thước chữ tiêu đề', default: '60px' },
            background: {
              type: 'object', label: 'Màu tiêu đề',
              objectFields: {
                type: {
                  type: 'select', label: 'Loại màu',
                  options: [
                    { label: 'Màu sắc', value: 'color' },
                    { label: 'Gradient', value: 'gradient' }
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
            size: { type: 'text', label: 'Cỡ Description', default: '14px' }
          }
        },
        button: {
          type: 'object',
          label: 'Cấu hình nút',
          objectFields: {
            text: { type: 'text', label: 'Chữ trong nút', contentEditable: true },
            textColor: { type: 'text', label: 'Màu chữ nút', default: '#ffffff' },
            textSize: { type: 'text', label: 'Cỡ chữ nút', default: '16px' },
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
                    { label: 'Gradient', value: 'gradient' }
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
                tl: { type: 'text', label: 'Trên - Trái', default: '9999px' },
                tr: { type: 'text', label: 'Trên - Phải', default: '9999px' },
                br: { type: 'text', label: 'Dưới - Phải', default: '9999px' },
                bl: { type: 'text', label: 'Dưới - Trái', default: '9999px' }
              }
            }
          }
        }
      },
      defaultProps: {
        background: { type: 'color', color: '#1e3a8a', gradientFrom: '#1e3a8a', gradientTo: '#764ba2', gradientDirection: 'to bottom right' },
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
                { label: 'Hình ảnh', value: 'image' }
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
                    { label: 'Gradient', value: 'gradient' }
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
                    { label: 'Hình ảnh', value: 'image' }
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
                        { label: 'Gradient', value: 'gradient' }
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
                { label: 'Hình ảnh', value: 'image' }
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
                    { label: 'Gradient', value: 'gradient' }
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
                { label: 'Hình ảnh', value: 'image' }
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
                    { label: 'Gradient', value: 'gradient' }
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
            logoUrl: { type: 'text', label: 'URL Logo' },
            alt: { type: 'text', label: 'Tên hội viên / Alt text' },
            link: { type: 'text', label: 'Đường dẫn liên kết' }
          },
          getItemSummary: (item) => item.alt || 'Hội viên mới'
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
        logos: [
          { logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop&text=HAPPYFOOD', alt: 'HAPPYFOOD', link: '#' },
          { logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop&text=ECOBOOK', alt: 'ECOBOOK', link: '#' },
          { logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop&text=COMOON', alt: 'COMOON', link: '#' }
        ]
      },
      render: (props) => <AdminHoiVien {...props} />
    },
  },



  // Sidebar categories
  categoryGroups: [
    { title: 'Cơ bản', components: ['Heading', 'Text', 'Image'] },
    { title: 'Layout', components: ['Section'] },
    { title: 'Nâng cao', components: ['Hero'] },
    { title: 'Câu Lạc Bộ', components: ['Header', 'SenHong', 'CacBan', 'GioiThieu', 'HoiVien'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
