$(document).ready(function(){
    // JavaScript-код для слайдера та галереї

    // Знаходимо елемент стрічки пошуку
    var searchFilter = document.querySelector('.search-filter');

    // Зберігаємо попереднє значення прокрутки сторінки
    var prevScrollPos = window.pageYOffset;

    // Додаємо слухач події прокрутки сторінки
    window.addEventListener('scroll', function() {
        var currentScrollPos = window.pageYOffset;
        // Перевіряємо, чи прокрутили сторінку вниз
        if (prevScrollPos > currentScrollPos) {
            // Приховуємо стрічку з пошуком з плавною анімацією
            searchFilter.classList.remove('scroll-down');
            searchFilter.classList.add('scroll-up');
        } else {
            // Показуємо стрічку з пошуком з плавною анімацією
            searchFilter.classList.remove('scroll-up');
            searchFilter.classList.add('scroll-down');
        }
        // Оновлюємо значення прокрутки сторінки
        prevScrollPos = currentScrollPos;
    });

    // Функція фільтрації товарів за ціною
    function filterByPrice(price) {
        $('.product-item').hide(); // Сховати всі товари

        // Показати товари, які відповідають вибраній ціні
        if (price === 'all') {
            $('.product-item').show(); // Показати всі товари
        } else {
            $('.product-item').each(function() {
                var productPrice = parseInt($(this).find('.price').text().replace('$', ''));
                if (productPrice <= parseInt(price)) {
                    $(this).show(); // Показати товар, який відповідає вибраній ціні
                }
            });
        }
    }

    // Функція фільтрації товарів при відправці форми
    $('#filter-form').submit(function(event) {
        event.preventDefault(); // Зупинити дію за замовчуванням

        var searchQuery = $('#search').val().toLowerCase(); // Отримати рядок пошуку та перетворити його на нижній регістр
        var priceFilter = $('#price-filter').val(); // Отримати вибране значення фільтра за ціною

        $('.product-item').hide(); // Сховати всі товари

        // Показати товари, які відповідають рядку пошуку та вибраній ціні
        $('.product-item').each(function() {
            var productName = $(this).find('h3').text().toLowerCase(); // Отримати назву товару та перетворити її на нижній регістр
            if (productName.includes(searchQuery)) {
                if (priceFilter === 'all') {
                    $(this).show(); // Показати товар, який відповідає рядку пошуку та всій ціні
                } else {
                    var productPrice = parseInt($(this).find('.price').text().replace('$', '')); // Отримати ціну товару
                    if (productPrice <= parseInt(priceFilter)) {
                        $(this).show(); // Показати товар, який відповідає рядку пошуку та вибраній ціні
                    }
                }
            }
        });
    });

    // Пошук
    $('#search-input').on('input', function(){
        var value = $(this).val().toLowerCase();
        $('.product-item').filter(function(){
            $(this).toggle($(this).find('h3').text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Фільтр за брендом
    $('#brand-filter').on('change', function(){
        var brand = $(this).val().toLowerCase();
        $('.product-item').filter(function(){
            var itemBrand = $(this).find('img').attr('alt').toLowerCase();
            $(this).toggle(itemBrand.indexOf(brand) > -1 || brand === '');
        });
    });

    // Фільтр за ціною
    $('#price-filter').on('input', function(){
        var price = $(this).val();
        $('.product-item').filter(function(){
            var itemPrice = parseInt($(this).find('.price').text().replace(/\D/g, ''));
            $(this).toggle(itemPrice <= price || price === '');
        });
    });
});
