// 移动端优化脚本
(function () {
    'use strict';

    // 检测是否为移动设备
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 移动端优化初始化
    function initMobileOptimization() {
        if (!isMobile()) return;

        // 1. 优化评论区域
        function optimizeComments() {
            const commentContainer = document.getElementById('post-comment');
            if (commentContainer) {
                commentContainer.style.padding = '15px';
                commentContainer.style.margin = '15px 0';
                commentContainer.style.borderRadius = '12px';
            }

            // 优化 Twikoo 评论框
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList') {
                        const twikooContainer = document.querySelector('.twikoo');
                        if (twikooContainer) {
                            // 优化输入框
                            const textareas = twikooContainer.querySelectorAll('textarea');
                            textareas.forEach(textarea => {
                                textarea.style.fontSize = '16px'; // 防止iOS缩放
                                textarea.style.padding = '12px';
                                textarea.style.borderRadius = '8px';
                                textarea.style.lineHeight = '1.5';
                            });

                            // 优化按钮
                            const buttons = twikooContainer.querySelectorAll('button');
                            buttons.forEach(button => {
                                button.style.padding = '8px 16px';
                                button.style.borderRadius = '6px';
                                button.style.fontSize = '14px';
                            });

                            // 优化评论列表
                            const comments = twikooContainer.querySelectorAll('.tk-comment');
                            comments.forEach(comment => {
                                comment.style.padding = '12px';
                                comment.style.margin = '10px 0';
                                comment.style.borderRadius = '8px';
                            });
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        // 2. 优化侧边栏
        function optimizeSidebar() {
            const asideContent = document.getElementById('aside-content');
            if (asideContent) {
                asideContent.style.padding = '0 15px 15px';

                const cardWidgets = asideContent.querySelectorAll('.card-widget');
                cardWidgets.forEach(widget => {
                    widget.style.marginTop = '15px';
                    widget.style.padding = '15px 18px';
                    widget.style.borderRadius = '12px';
                });
            }
        }

        // 3. 优化文章内容
        function optimizeArticle() {
            const articleContainer = document.getElementById('article-container');
            if (articleContainer) {
                articleContainer.style.padding = '15px';
                articleContainer.style.margin = '10px 0';
                articleContainer.style.borderRadius = '12px';
            }

            // 优化代码块
            const codeBlocks = document.querySelectorAll('figure.highlight');
            codeBlocks.forEach(block => {
                block.style.margin = '15px 0';
                block.style.borderRadius = '8px';

                const pre = block.querySelector('pre');
                if (pre) {
                    pre.style.padding = '15px';
                    pre.style.fontSize = '13px';
                    pre.style.lineHeight = '1.4';
                }
            });

            // 优化表格
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
                table.style.fontSize = '13px';
                table.style.minWidth = '100%';

                // 添加横向滚动容器
                if (!table.parentElement.classList.contains('table-wrap')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-wrap';
                    wrapper.style.overflowX = 'auto';
                    wrapper.style.margin = '15px 0';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            });
        }

        // 4. 优化图片
        function optimizeImages() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.borderRadius = '8px';
            });
        }

        // 5. 优化右侧工具栏
        function optimizeRightside() {
            const rightside = document.getElementById('rightside');
            if (rightside) {
                rightside.style.right = '15px';
                rightside.style.bottom = '20px';

                const buttons = rightside.querySelectorAll('> div');
                buttons.forEach(button => {
                    button.style.marginBottom = '8px';
                    button.style.width = '40px';
                    button.style.height = '40px';
                });
            }
        }

        // 6. 优化搜索框
        function optimizeSearch() {
            const searchInputs = document.querySelectorAll('.local-search-box input, input[type="search"]');
            searchInputs.forEach(input => {
                input.style.fontSize = '16px'; // 防止iOS缩放
                input.style.padding = '12px 15px';
                input.style.borderRadius = '8px';
            });
        }

        // 7. 优化音乐播放器
        function optimizeAplayer() {
            const aplayers = document.querySelectorAll('.aplayer');
            aplayers.forEach(player => {
                player.style.margin = '10px 0';
                player.style.borderRadius = '8px';

                if (player.classList.contains('aplayer-narrow')) {
                    player.style.width = '100%';
                }
            });
        }

        // 8. 防止iOS Safari缩放
        function preventZoom() {
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            });

            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }

        // 9. 优化滚动性能
        function optimizeScroll() {
            // 添加平滑滚动
            document.documentElement.style.scrollBehavior = 'smooth';

            // 优化滚动性能
            let ticking = false;
            function updateScrollElements() {
                // 这里可以添加滚动时的优化逻辑
                ticking = false;
            }

            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateScrollElements);
                    ticking = true;
                }
            }

            window.addEventListener('scroll', requestTick);
        }

        // 执行所有优化
        optimizeComments();
        optimizeSidebar();
        optimizeArticle();
        optimizeImages();
        optimizeRightside();
        optimizeSearch();
        optimizeAplayer();
        preventZoom();
        optimizeScroll();

        // 监听窗口大小变化
        window.addEventListener('resize', function () {
            if (isMobile()) {
                // 重新应用移动端优化
                setTimeout(() => {
                    optimizeArticle();
                    optimizeImages();
                    optimizeRightside();
                }, 100);
            }
        });

        console.log('移动端优化已启用');
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileOptimization);
    } else {
        initMobileOptimization();
    }

    // PJAX 支持
    if (typeof pjax !== 'undefined') {
        document.addEventListener('pjax:complete', initMobileOptimization);
    }

})();