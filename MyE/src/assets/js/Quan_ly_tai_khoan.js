// Dynamic User Data & Header Dropdown logic for Quan_ly_tai_khoan.html
document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Dropdown Toggle
    const toggleBtn = document.getElementById('user-profile-toggle');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const wrapper = document.getElementById('user-profile-wrapper');

    if (toggleBtn && dropdownMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (wrapper && !wrapper.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // 2. Read User Data from localStorage (set by Dang_nhap.html)
    const userRaw = localStorage.getItem('mye_user');
    if (userRaw) {
        try {
            const user = JSON.parse(userRaw);
            
            // Update Header User Profile
            const headerAvatar = document.getElementById('header-user-avatar');
            const headerName = document.getElementById('header-user-name');
            const headerId = document.getElementById('header-user-id');
            const dropdownAvatar = document.getElementById('dropdown-user-avatar');
            const dropdownName = document.getElementById('dropdown-user-name');
            const dropdownId = document.getElementById('dropdown-user-id');

            if (headerAvatar) headerAvatar.src = '../assets/images/Quan_ly_tai_khoan/avatar_user.png';
            if (headerName) headerName.textContent = user.username || 'myepro01';
            if (headerId) headerId.textContent = 'MyE ID: ' + (user.myeId || '00123');
            
            if (dropdownAvatar) dropdownAvatar.src = '../assets/images/Quan_ly_tai_khoan/avatar_user.png';
            if (dropdownName) dropdownName.textContent = user.username || 'myepro01';
            if (dropdownId) dropdownId.textContent = 'MyE ID: ' + (user.myeId || '00123');

            // Update Hero Banner User Details
            const bannerAvatar = document.getElementById('banner-user-avatar');
            const bannerName = document.getElementById('banner-user-name');
            const bannerAccountType = document.getElementById('banner-account-type');
            const bannerMyeId = document.getElementById('banner-mye-id');

            if (bannerAvatar) bannerAvatar.src = '../assets/images/Quan_ly_tai_khoan/avatar_user.png';
            if (bannerName) bannerName.textContent = user.username || 'Nguyễn Văn A';
            
            if (user.loginType === 'facebook') {
                if (bannerAccountType) bannerAccountType.textContent = 'Tài khoản: fb712314335';
            } else if (user.loginType === 'google') {
                if (bannerAccountType) bannerAccountType.textContent = 'Tài khoản: gg712314335';
            } else if (user.loginType === 'user_MYE') {
                if (bannerAccountType) bannerAccountType.textContent = 'Tài khoản: mye712314335';
            } else {
                if (bannerAccountType) bannerAccountType.textContent = 'Tài khoản: fb712314335';
            }

            if (bannerMyeId) bannerMyeId.textContent = 'MyE ID: ' + (user.myeId || '00123');

            // Update Account Info Section (Full Name & Email)
            const infoFullname = document.getElementById('info-fullname');
            const infoEmail = document.getElementById('info-email');
            if (infoFullname) infoFullname.textContent = user.username || 'Nguyễn Văn A';
            if (infoEmail) infoEmail.textContent = (user.username ? user.username.toLowerCase().replace(/\s+/g, '') : 'damaaa') + '@gmail.com';

            // Update Section 2: Current Linked Account Box based on loginType
            const syncLogo = document.getElementById('sync-provider-logo');
            const syncName = document.getElementById('sync-provider-name');
            const syncId = document.getElementById('sync-provider-id');

            const singleLogo = document.getElementById('sync-single-provider-logo');
            const singleName = document.getElementById('sync-single-provider-name');
            const singleId = document.getElementById('sync-single-provider-id');

            const successLogo = document.getElementById('sync-success-provider-logo');
            const successName = document.getElementById('sync-success-provider-name');
            const successId = document.getElementById('sync-success-provider-id');
            const successMyeUser = document.getElementById('sync-success-mye-username');
            const successAlertText = document.getElementById('sync-success-alert-text');

            const syncedLogo = document.getElementById('sync-synced-provider-logo');
            const syncedName = document.getElementById('sync-synced-provider-name');
            const syncedId = document.getElementById('sync-synced-provider-id');
            const syncedMyeUser = document.getElementById('sync-synced-mye-username');

            const providerTitle = user.loginType === 'google' ? 'Google' : (user.loginType === 'facebook' ? 'Facebook' : 'MYE');

            if (user.loginType === 'facebook') {
                if (syncLogo) syncLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_facebook.png';
                if (syncName) syncName.textContent = user.username || 'Nguyễn Văn A';
                if (syncId) syncId.textContent = 'fb.231244';

                if (singleLogo) singleLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_facebook.png';
                if (singleName) singleName.textContent = user.username || 'Nguyễn Văn A';
                if (singleId) singleId.textContent = 'fb.01020';

                if (successLogo) successLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_facebook.png';
                if (successName) successName.textContent = user.username || 'Nguyễn Văn A';
                if (successId) successId.textContent = 'fb.01020';

                if (syncedLogo) syncedLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_facebook.png';
                if (syncedName) syncedName.textContent = user.username || 'Nguyễn Văn A';
                if (syncedId) syncedId.textContent = 'fb.231244';
            } else if (user.loginType === 'google') {
                if (syncLogo) syncLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_google.png';
                if (syncName) syncName.textContent = user.username || 'Nguyễn Văn A';
                if (syncId) syncId.textContent = 'gg.231244';

                if (singleLogo) singleLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_google.png';
                if (singleName) singleName.textContent = user.username || 'Nguyễn Văn A';
                if (singleId) singleId.textContent = 'gg.01020';

                if (successLogo) successLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_google.png';
                if (successName) successName.textContent = user.username || 'Nguyễn Văn A';
                if (successId) successId.textContent = 'gg.01020';

                if (syncedLogo) syncedLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/logos_google.png';
                if (syncedName) syncedName.textContent = user.username || 'Nguyễn Văn A';
                if (syncedId) syncedId.textContent = 'gg.231244';
            } else {
                if (syncLogo) syncLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/user.png';
                if (syncName) syncName.textContent = user.username || 'Nguyễn Văn A';
                if (syncId) syncId.textContent = 'mye.231244';

                if (singleLogo) singleLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/user.png';
                if (singleName) singleName.textContent = user.username || 'Nguyễn Văn A';
                if (singleId) singleId.textContent = 'mye.01020';

                if (successLogo) successLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/user.png';
                if (successName) successName.textContent = user.username || 'Nguyễn Văn A';
                if (successId) successId.textContent = 'mye.01020';

                if (syncedLogo) syncedLogo.src = '../assets/images/Quan_ly_tai_khoan/Dong_bo_tai_khoan/user.png';
                if (syncedName) syncedName.textContent = user.username || 'Nguyễn Văn A';
                if (syncedId) syncedId.textContent = 'mye.231244';
            }

            const currentMyeUser = user.myeUsername || user.username || 'myepro1123';
            if (successMyeUser) successMyeUser.textContent = currentMyeUser;
            if (syncedMyeUser) syncedMyeUser.textContent = currentMyeUser;
            if (successAlertText) successAlertText.textContent = `Tài khoản đã được đồng bộ. Bạn có thể đăng nhập bằng tài khoản ${providerTitle} hoặc tài khoản MYE`;

            const syncMyeTypeUsername = document.getElementById('sync-mye-type-username');
            const syncMyeExpandedUsername = document.getElementById('sync-mye-expanded-username');
            if (syncMyeTypeUsername) syncMyeTypeUsername.textContent = currentMyeUser;
            if (syncMyeExpandedUsername) syncMyeExpandedUsername.textContent = currentMyeUser;

            // Check loginType: if user_MYE -> Show Unavailable MYE Box
            const syncInitialBox = document.getElementById('sync-exchange-box-initial');
            const syncSingleBox = document.getElementById('sync-single-account-box');
            const syncSyncedBox = document.getElementById('sync-exchange-box-synced');
            const syncMyeTypeBox = document.getElementById('sync-exchange-box-mye-type');
            const syncMyeExpandedContainer = document.getElementById('sync-mye-expanded-container');
            const syncFormSection = document.getElementById('sync-form-section');
            const syncSuccessContainer = document.getElementById('sync-success-container');

            if (user.loginType === 'user_MYE') {
                if (syncInitialBox) syncInitialBox.classList.add('d-none');
                if (syncSingleBox) syncSingleBox.classList.add('d-none');
                if (syncSyncedBox) syncSyncedBox.classList.add('d-none');
                if (syncFormSection) syncFormSection.classList.add('d-none');
                if (syncSuccessContainer) syncSuccessContainer.classList.add('d-none');

                // Default view for user_MYE is the compact 2-way box
                if (syncMyeExpandedContainer) syncMyeExpandedContainer.classList.add('d-none');
                if (syncMyeTypeBox) syncMyeTypeBox.classList.remove('d-none');
            } else if (user.myeSynced) {
                if (syncInitialBox) syncInitialBox.classList.add('d-none');
                if (syncSingleBox) syncSingleBox.classList.add('d-none');
                if (syncFormSection) syncFormSection.classList.add('d-none');
                if (syncSyncedBox) syncSyncedBox.classList.add('d-none');
                if (syncMyeTypeBox) syncMyeTypeBox.classList.add('d-none');
                if (syncMyeExpandedContainer) syncMyeExpandedContainer.classList.add('d-none');

                // Default to Detailed Synced View when page loads after sync
                if (syncSuccessContainer) syncSuccessContainer.classList.remove('d-none');
            }

        } catch (e) {
            console.error('Error parsing mye_user localStorage:', e);
        }
    }

    // Handle Logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('mye_user');
            window.location.href = 'Dang_nhap.html';
        });
    }

    // Handle Sync Toggle & Form Submit
    const badgeSyncStatus = document.getElementById('badge-sync-status');
    const syncCardToggle = document.getElementById('sync-card-toggle');
    const syncInitialBox = document.getElementById('sync-exchange-box-initial');
    const syncSingleBox = document.getElementById('sync-single-account-box');
    const syncSyncedBox = document.getElementById('sync-exchange-box-synced');
    const syncMyeTypeBox = document.getElementById('sync-exchange-box-mye-type');
    const syncMyeExpandedContainer = document.getElementById('sync-mye-expanded-container');
    const syncSuccessContainer = document.getElementById('sync-success-container');
    const syncFormSection = document.getElementById('sync-form-section');
    const syncForm = document.getElementById('form-sync-mye');

    function toggleSyncForm() {
        if (syncCardToggle) {
            syncCardToggle.classList.toggle('rotate-90');
        }

        const userRaw = localStorage.getItem('mye_user');
        let isSynced = false;
        let loginType = '';
        if (userRaw) {
            try {
                const u = JSON.parse(userRaw);
                isSynced = !!u.myeSynced;
                loginType = u.loginType || '';
            } catch (e) {}
        }

        // IF user_MYE: Toggle between Compact Unavailable 2-Way Box and Expanded Warning Banner View
        if (loginType === 'user_MYE') {
            const isMyeTypeVisible = syncMyeTypeBox && !syncMyeTypeBox.classList.contains('d-none');
            if (isMyeTypeVisible) {
                if (syncMyeTypeBox) syncMyeTypeBox.classList.add('d-none');
                if (syncMyeExpandedContainer) syncMyeExpandedContainer.classList.remove('d-none');
            } else {
                if (syncMyeExpandedContainer) syncMyeExpandedContainer.classList.add('d-none');
                if (syncMyeTypeBox) syncMyeTypeBox.classList.remove('d-none');
            }
            return;
        }

        if (isSynced) {
            // IF ALREADY SYNCED: Toggle between Synced Detailed View and Synced Compact 2-Way Box
            const isSuccessVisible = syncSuccessContainer && !syncSuccessContainer.classList.contains('d-none');
            if (isSuccessVisible) {
                if (syncSuccessContainer) syncSuccessContainer.classList.add('d-none');
                if (syncSyncedBox) syncSyncedBox.classList.remove('d-none');
            } else {
                if (syncSyncedBox) syncSyncedBox.classList.add('d-none');
                if (syncSuccessContainer) syncSuccessContainer.classList.remove('d-none');
            }
        } else {
            // IF NOT SYNCED: Toggle between Initial 2-Way Box and Form View
            const isFormVisible = syncFormSection && !syncFormSection.classList.contains('d-none');
            if (isFormVisible) {
                if (syncInitialBox) syncInitialBox.classList.remove('d-none');
                if (syncSingleBox) syncSingleBox.classList.add('d-none');
                if (syncFormSection) syncFormSection.classList.add('d-none');
            } else {
                if (syncInitialBox) syncInitialBox.classList.add('d-none');
                if (syncSingleBox) syncSingleBox.classList.remove('d-none');
                if (syncFormSection) syncFormSection.classList.remove('d-none');
            }
        }
    }

    if (badgeSyncStatus) badgeSyncStatus.addEventListener('click', toggleSyncForm);
    if (syncCardToggle) syncCardToggle.addEventListener('click', toggleSyncForm);

    // Card 3: Handle History Card Toggle & Arrow Rotate
    const historyCardToggle = document.getElementById('history-card-toggle');
    const historySectionBody = document.getElementById('history-section-body');
    if (historyCardToggle && historySectionBody) {
        historyCardToggle.addEventListener('click', () => {
            historyCardToggle.classList.toggle('rotate-90');
            historySectionBody.classList.toggle('d-none');
        });
    }

    const btnLogoutAll = document.getElementById('btn-logout-all-devices');
    if (btnLogoutAll) {
        btnLogoutAll.addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn gỡ tất cả các phiên đăng nhập đã lưu trên các thiết bị khác?')) {
                alert('Đã gỡ tất cả các phiên đăng nhập thành công!');
            }
        });
    }

    // Form Validation for Sync MYE Form
    if (syncForm) {
        const inputUsername = document.getElementById('input-sync-username');
        const inputPassword = document.getElementById('input-sync-password');
        const inputConfirmPassword = document.getElementById('input-sync-confirm-password');

        const errorUsername = document.getElementById('error-sync-username');
        const errorPassword = document.getElementById('error-sync-password');
        const errorConfirmPassword = document.getElementById('error-sync-confirm-password');

        function showError(inputEl, errorEl, message) {
            if (inputEl) inputEl.classList.add('input-invalid');
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.remove('d-none');
            }
        }

        function clearError(inputEl, errorEl) {
            if (inputEl) inputEl.classList.remove('input-invalid');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.add('d-none');
            }
        }

        // Real-time input clear error listeners
        if (inputUsername) inputUsername.addEventListener('input', () => clearError(inputUsername, errorUsername));
        if (inputPassword) inputPassword.addEventListener('input', () => clearError(inputPassword, errorPassword));
        if (inputConfirmPassword) inputConfirmPassword.addEventListener('input', () => clearError(inputConfirmPassword, errorConfirmPassword));

        syncForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const usernameVal = inputUsername ? inputUsername.value.trim() : '';
            const passwordVal = inputPassword ? inputPassword.value : '';
            const confirmPasswordVal = inputConfirmPassword ? inputConfirmPassword.value : '';

            // Reset previous errors
            clearError(inputUsername, errorUsername);
            clearError(inputPassword, errorPassword);
            clearError(inputConfirmPassword, errorConfirmPassword);

            // 1. Validate Username (Min 6 characters)
            if (!usernameVal) {
                showError(inputUsername, errorUsername, 'Vui lòng nhập tên đăng nhập MYE');
                isValid = false;
            } else if (usernameVal.length < 6) {
                showError(inputUsername, errorUsername, 'Tên đăng nhập phải có tối thiểu 6 kí tự');
                isValid = false;
            }

            // 2. Validate Password (Min 8 characters)
            if (!passwordVal) {
                showError(inputPassword, errorPassword, 'Vui lòng nhập mật khẩu');
                isValid = false;
            } else if (passwordVal.length < 8) {
                showError(inputPassword, errorPassword, 'Mật khẩu phải có tối thiểu 8 kí tự');
                isValid = false;
            }

            // 3. Validate Confirm Password (Min 8 characters & Match Password)
            if (!confirmPasswordVal) {
                showError(inputConfirmPassword, errorConfirmPassword, 'Vui lòng xác nhận lại mật khẩu');
                isValid = false;
            } else if (confirmPasswordVal.length < 8) {
                showError(inputConfirmPassword, errorConfirmPassword, 'Mật khẩu xác nhận phải có tối thiểu 8 kí tự');
                isValid = false;
            } else if (confirmPasswordVal !== passwordVal) {
                showError(inputConfirmPassword, errorConfirmPassword, 'Mật khẩu xác nhận không trùng khớp');
                isValid = false;
            }

            // Stop if invalid
            if (!isValid) return;

            // Proceed with Sync
            const myeUsernameVal = usernameVal || 'myepro01';
            const userRaw = localStorage.getItem('mye_user');
            if (userRaw) {
                try {
                    const user = JSON.parse(userRaw);
                    user.myeSynced = true;
                    user.myeUsername = myeUsernameVal;
                    localStorage.setItem('mye_user', JSON.stringify(user));
                } catch (err) {
                    console.error('Error updating mye_user sync:', err);
                }
            }

            // Update UI to Synced Success View (New Screenshot State)
            const syncSuccessContainer = document.getElementById('sync-success-container');
            const successMyeUser = document.getElementById('sync-success-mye-username');

            if (successMyeUser) successMyeUser.textContent = myeUsernameVal;

            if (syncInitialBox) syncInitialBox.classList.add('d-none');
            if (syncSingleBox) syncSingleBox.classList.add('d-none');
            if (syncFormSection) syncFormSection.classList.add('d-none');
            if (syncSuccessContainer) syncSuccessContainer.classList.remove('d-none');

            alert('Đồng bộ tài khoản MYE thành công!');
        });
    }

    // 3. Edit Mode Toggle for Personal Information Card
    const btnEditInfo = document.getElementById('btn-edit-info');
    const editHeaderActions = document.getElementById('edit-header-actions');
    const btnCancelEdit = document.getElementById('btn-cancel-edit');
    const btnSaveEdit = document.getElementById('btn-save-edit');

    const viewTexts = document.querySelectorAll('.view-mode-text');
    const editInputs = document.querySelectorAll('.edit-mode-input');

    if (btnEditInfo) {
        btnEditInfo.addEventListener('click', () => {
            // Switch to Edit Mode
            btnEditInfo.classList.add('d-none');
            if (editHeaderActions) editHeaderActions.classList.remove('d-none');

            viewTexts.forEach(el => el.classList.add('d-none'));
            editInputs.forEach(el => el.classList.remove('d-none'));
        });
    }

    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', () => {
            // Switch back to Read Mode without saving
            if (editHeaderActions) editHeaderActions.classList.add('d-none');
            if (btnEditInfo) btnEditInfo.classList.remove('d-none');

            viewTexts.forEach(el => el.classList.remove('d-none'));
            editInputs.forEach(el => el.classList.add('d-none'));
        });
    }

    if (btnSaveEdit) {
        btnSaveEdit.addEventListener('click', () => {
            // Read input values
            const inputFullname = document.getElementById('input-edit-fullname');
            const selectGender = document.getElementById('select-edit-gender');
            const inputBirthday = document.getElementById('input-edit-birthday');
            const inputAddress = document.getElementById('input-edit-address');

            const infoFullname = document.getElementById('info-fullname');
            const infoGender = document.getElementById('info-gender');
            const infoBirthday = document.getElementById('info-birthday');
            const infoAddress = document.getElementById('info-address');
            const bannerName = document.getElementById('banner-user-name');

            if (inputFullname && infoFullname) {
                infoFullname.textContent = inputFullname.value;
                if (bannerName) bannerName.textContent = inputFullname.value;
            }
            if (selectGender && infoGender) infoGender.textContent = selectGender.value;
            if (inputBirthday && infoBirthday) infoBirthday.textContent = inputBirthday.value;
            if (inputAddress && infoAddress) infoAddress.textContent = inputAddress.value;

            // Update localStorage
            const userRaw = localStorage.getItem('mye_user');
            if (userRaw) {
                try {
                    const user = JSON.parse(userRaw);
                    if (inputFullname) user.username = inputFullname.value;
                    localStorage.setItem('mye_user', JSON.stringify(user));
                } catch (e) {
                    console.error('Error saving updated mye_user:', e);
                }
            }

            // Switch back to Read Mode
            if (editHeaderActions) editHeaderActions.classList.add('d-none');
            if (btnEditInfo) btnEditInfo.classList.remove('d-none');

            viewTexts.forEach(el => el.classList.remove('d-none'));
            editInputs.forEach(el => el.classList.add('d-none'));
        });
    }
});
