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
import AdminBackgroundField from './components/metik/admin.backgroundField';
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
            titleConfig: { color: '#f97316', size: '18px', weight: 'bold', style: 'normal', decoration: 'none', bgColor: '#fbc02d'  },
            imageUrl: 'https://metik.vn/wp-content/uploads/2026/06/snack-vi-tao-bien.jpg.webp',
            alt: 'Sản phẩm mới'
          },
          getItemSummary: (item) => item.title || 'Sản phẩm mới'
        }
      },
      defaultProps: {
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
