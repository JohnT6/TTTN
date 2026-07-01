import AdminBackgroundField from './components/admin.backgroundField';
import AdminHeaderMetik from './components/admin.header';
import AdminBannerMetik from './components/admin.banner';
import AdminSanPhamMetik from './components/admin.sanpham';
import AdminGioiThieuMetik from './components/admin.gioithieu';
import AdminVeChungToiMetik from './components/admin.vechungtoi';
import AdminDanhGiaMetik from './components/admin.danhgia';
import AdminFooterMetik from './components/admin.footer';
import AdminLienHeMetik from './components/admin.lienhe';
import AdminBreadcrumbMetik from './components/admin.breadcrumb';
import MetikImageField from './components/admin.inlineImage';

//Config — đăng ký 5 components với fields + defaultProps + render.

export const puckConfig = {
  components: {
    AdminHeaderMetik: {
      label: 'MeTik Header',
      fields: {
        logoUrl: { type: 'text', label: 'URL Logo' },
        stickyScrollThreshold: { type: 'number', label: 'Vị trí cuộn (px) để hiện Header nhỏ', default: 300 },
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
            titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d' },
            imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp',
            alt: 'Sản phẩm mới'
          },
          getItemSummary: (item) => item.title || 'Sản phẩm mới'
        }
      },
      defaultProps: {
        title: 'SẢN PHẨM MỚI',
        titleConfig: { color: '#2e7d32', size: '30px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d' },
        background: { type: 'color', color: '#ffffff' },
        products: [
          { title: 'Snack vị Tảo biển', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d' }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp', alt: 'Snack vị Tảo biển' },
          { title: 'Snack vị BBQ', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d' }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bbq.jpg.webp', alt: 'Snack vị BBQ' },
          { title: 'Snack vị Bắp', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d' }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-bap.jpg.webp', alt: 'Snack vị Bắp' },
          { title: 'Snack vị Phô mai', titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d' }, imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-pho-mai.webp', alt: 'Snack vị Phô mai' }
        ]
      },
      render: (props) => <AdminSanPhamMetik {...props} />
    },

    AdminBreadcrumbMetik: {
      label: 'MeTik Breadcrumb',
      fields: {
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
            isActive: { type: 'select', label: 'Đang hiển thị (không dùng Link)?', options: [{ label: 'Không (Có Link)', value: 'false' }, { label: 'Có (Không Link)', value: 'true' }] }
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
        layoutMode: 'full_map',
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
        title: 'GIỚI THIỆU VỀ METIK',
        titleConfig: { color: '#2e7d32', size: '30px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d' },
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
        layout: 'text_left',
        title: 'VỀ CHÚNG TÔI',
        titleConfig: { color: '#2e7d32', size: '30px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d' },
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
        title: 'KHÁCH HÀNG NÓI GÌ?',
        titleConfig: { color: '#4caf50', size: '28px', weight: '900', style: 'normal', decoration: 'none', bgColor: '#fbc02d' },
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
                weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }
              }
            },
            items: {
              type: 'array',
              label: 'Danh sách Item',
              arrayFields: {
                tagType: { type: 'select', label: 'Loại thẻ', options: [{ label: 'Văn bản thường (<p>)', value: 'p' }, { label: 'Đường dẫn (<a>)', value: 'link' }] },
                linkAction: { type: 'select', label: 'Hành động Link', options: [{ label: 'Trang Web', value: 'url' }, { label: 'Gọi điện (tel:)', value: 'tel' }, { label: 'Email (mailto:)', value: 'mail' }] },
                urlValue: { type: 'text', label: 'Giá trị URL / SĐT' },
                iconType: { type: 'select', label: 'Loại Icon', options: [{ label: 'Không có', value: 'none' }, { label: 'Điện thoại', value: 'phone' }, { label: 'Email', value: 'mail' }, { label: 'Vị trí', value: 'location' }, { label: 'Tùy chỉnh (SVG)', value: 'custom' }] },
                customSvg: { type: 'textarea', label: 'Mã SVG Tùy chỉnh' },
                text: { type: 'textarea', label: 'Nội dung hiển thị', contentEditable: true },
                itemConfig: {
                  type: 'object', label: 'Định dạng chữ',
                  objectFields: {
                    color: { type: 'text', label: 'Màu chữ' },
                    size: { type: 'text', label: 'Cỡ chữ' },
                    weight: { type: 'select', label: 'Độ đậm', options: [{ label: 'Normal', value: 'normal' }, { label: 'Bold', value: 'bold' }] },
                    style: { type: 'select', label: 'Kiểu', options: [{ label: 'Bình thường', value: 'normal' }, { label: 'In nghiêng', value: 'italic' }] }
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
  },

  // Sidebar categories
  categoryGroups: [
    { title: 'MeTik', components: ['AdminHeaderMetik', 'AdminBannerMetik', 'AdminGioiThieuMetik', 'AdminVeChungToiMetik', 'AdminDanhGiaMetik', 'AdminSanPhamMetik', 'AdminBreadcrumbMetik', 'AdminLienHeMetik', 'AdminFooterMetik'] }
  ],

  // Root config
  root: {
    render: ({ children }) => (
      <div className="min-h-screen">{children}</div>
    )
  }
};

export default puckConfig;
