<?php

/**
 * mother functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package mother
 */

if (! defined('_S_VERSION')) {
    // Replace the version number of the theme on each release.
    define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function mother_setup()
{
    /*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on mother, use a find and replace
		* to change 'mother' to the name of your theme in all the template files.
		*/
    load_theme_textdomain('mother', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    /*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
    add_theme_support('title-tag');

    /*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
    add_theme_support('post-thumbnails');

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus(
        array(
            'primary' => esc_html__('Primary', 'mother'),
            'pop-out' => esc_html__('Pop Out', 'mother'),
        )
    );

    /*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    // Set up the WordPress core custom background feature.
    add_theme_support(
        'custom-background',
        apply_filters(
            'mother_custom_background_args',
            array(
                'default-color' => 'ffffff',
                'default-image' => '',
            )
        )
    );

    // Add theme support for selective refresh for widgets.
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Add support for core custom logo.
     *
     * @link https://codex.wordpress.org/Theme_Logo
     */
    add_theme_support(
        'custom-logo',
        array(
            'height'      => 250,
            'width'       => 250,
            'flex-width'  => true,
            'flex-height' => true,
        )
    );
}
add_action('after_setup_theme', 'mother_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function mother_content_width()
{
    $GLOBALS['content_width'] = apply_filters('mother_content_width', 640);
}
add_action('after_setup_theme', 'mother_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function mother_widgets_init()
{
    register_sidebar(
        array(
            'name'          => esc_html__('Sidebar', 'mother'),
            'id'            => 'sidebar-1',
            'description'   => esc_html__('Add widgets here.', 'mother'),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );
}
add_action('widgets_init', 'mother_widgets_init');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/jetpack.php';
}

add_theme_support('post-thumbnails');


/**
 * Enqueue scripts and styles.
 */
function mother_scripts()
{

    wp_enqueue_style('magnific', get_template_directory_uri() . '/assets/magnific-popup-gallery.css');

    wp_enqueue_style('mother-bootstrap', get_template_directory_uri() . '/assets/bootstrap/bootstrap.min.css', array());

    // wp_enqueue_style('mother-slick', get_template_directory_uri() . '/assets/slick/slick-theme.css', array());

    // wp_enqueue_style('mother-bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', array());

    // wp_enqueue_style('mother-slick', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css', array());

    wp_enqueue_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css', array());

    wp_enqueue_style('outfit-google-font', 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap', [], null);

    wp_enqueue_style('mother-global', get_template_directory_uri() . '/assets/global-styles.css', array(), time(), false);

    wp_enqueue_style('mother-home', get_template_directory_uri() . '/assets/pages-styles.css', array(), time());

    //wp_enqueue_style( 'mother-magnific', get_template_directory_uri(). '/assets/magnific-styles.css', array());

    wp_enqueue_style('mother-mobile', get_template_directory_uri() . '/assets/mobile.css', array(), time());

    wp_enqueue_script('bootstrap_js', get_template_directory_uri() . '/assets/bootstrap/bootstrap.min.js', array(), time());

    // wp_enqueue_script('slick_js', get_template_directory_uri() . '/assets/slick/slick.min.js', array(), time());

    // wp_enqueue_script('bootstrap_js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js', array('jquery'));

    // wp_enqueue_script('slick_js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', array('jquery'));

    wp_enqueue_script('fontawesome_js', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js', array('jquery'));

    wp_enqueue_script('custom_js', get_template_directory_uri() . '/assets/custom.js', array('acf-input'), '20150734',true);

    wp_enqueue_script('jquery-parallax', get_template_directory_uri() . '/assets/jquery.parallax-scroll.js', array('jquery'), '1.0', true);

    // wp_enqueue_script('ajax-pagination', get_template_directory_uri() . '/assets/ajax-pagination.js', array('jquery'), time(), true);

    // Add this localization
    wp_localize_script('custom_js', 'ajaxpagination', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('ajax-pagination-nonce')
    ));
}

add_action('wp_enqueue_scripts', 'mother_scripts');


function my_excerpt($excerpt_length = 55, $id = false, $echo = true)
{

    $text = '';

    if ($id) {
        $the_post = &get_post($my_id = $id);
        $text = ($the_post->post_excerpt) ? $the_post->post_excerpt : $the_post->post_content;
    } else {
        global $post;
        $text = ($post->post_excerpt) ? $post->post_excerpt : get_the_content('');
    }

    $text = strip_shortcodes($text);
    $text = apply_filters('the_content', $text);
    $text = str_replace(']]>', ']]&gt;', $text);
    $text = strip_tags($text);

    $excerpt_more = ' ' . '...';
    $words = preg_split("/[\n\r\t ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
    if (count($words) > $excerpt_length) {
        array_pop($words);
        $text = implode(' ', $words);
        $text = $text . $excerpt_more;
    } else {
        $text = implode(' ', $words);
    }
    if ($echo)
        echo apply_filters('the_content', $text);
    else
        return $text;
}

function get_my_excerpt($excerpt_length = 55, $id = false, $echo = false)
{
    return my_excerpt($excerpt_length, $id, $echo);
}

function new_excerpt_more($more)
{
    global $post;
    remove_filter('excerpt_more', 'new_excerpt_more');
    return '&#8230;';
}
add_filter('excerpt_more', 'new_excerpt_more');



function replace_excerpt($text)
{
    return str_replace('[...]', '&hellip;', $text);
}
add_filter('the_excerpt', 'replace_excerpt');

add_action('init', 'my_init_function');

function my_init_function()
{
    add_image_size('home_img', 254, 170, TRUE);
    add_image_size('archives_img', 308, 210, TRUE);
    add_image_size('picks_img', 470, 321, TRUE);
    add_image_size('post-loop', 940, 642, TRUE);
    add_image_size('post-half', 1280, 581, TRUE);
    add_image_size('post-half-loop', 1280, 581, TRUE);
    add_image_size('category-half-loop', 1000, 650, TRUE);
    add_image_size('single-img', 994, 662, TRUE);
    add_image_size('blog-vertical', 721, 801, TRUE);
}

function codex_custom_init()
{
    $labels = array(
        'name' => _x('Editors Picks', 'post type general name'),
        'singular_name' => _x('Editors Pick', 'post type singular name'),
        'add_new' => _x('Add New', 'pick'),
        'add_new_item' => __('Add New Pick'),
        'edit_item' => __('Edit Pick'),
        'new_item' => __('New Pick'),
        'all_items' => __('All Picks'),
        'view_item' => __('View Pick'),
        'search_items' => __('Search Picks'),
        'not_found' =>  __('No picks found'),
        'not_found_in_trash' => __('No picks found in Trash'),
        'parent_item_colon' => '',
        'menu_name' => __('Editors Picks')

    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => true,
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt'),
        'taxonomies' => array('category', 'post_tag')
    );
    register_post_type('picks', $args);
}
//add_action( 'init', 'codex_custom_init' );

function get_post_category($id)
{
    $categories = get_the_category($id);

    if (! empty($categories)) {
        $category_link = get_category_link($id);
        return '<a class="category-link" href="' . get_category_link($categories[0]) . '">' . esc_html($categories[0]->name) . '</a>';
    }
}

function get_post_icon($id)
{
    $gallery = get_field('the_gallery', $id);
    $gallery_mother = get_field('gallery', $id);

    if (has_block('embed', $id)) {
        return '<img class="d-none d-md-block post-thumbnail-icon" src="' . get_template_directory_uri() . '/images/video.svg">';
    }

    if (! empty($gallery) || ! empty($gallery_mother)) {
        return '<img class="d-none d-md-block post-thumbnail-icon" src="' . get_template_directory_uri() . '/images/gallery.svg">';
    }
}

function get_post_category_name($id)
{
    $categories = get_the_category($id);

    if (! empty($categories)) {
        return $categories[0]->slug;
    }
}

function get_post_category_name_full($id)
{
    $categories = get_the_category($id);

    if (! empty($categories)) {
        return $categories[0]->name;
    }
}


function get_time_ago($id)
{
    $posted = get_the_time('U', $id);
    echo '<span class="time-ago">' . human_time_diff($posted, current_time('U')) . ' ago</span>';
}

// add brand color palette to acf color picker
function mother_acf_input_admin_footer()
{
?><script type="text/javascript">
        (function($) {
            acf.add_filter('color_picker_args', function(args, $field) {
                args.palettes = ["#000000", "#F9DB85", "#C78344", "#E2AF92", "#CDADC0", "#C26957", "#F0D4C8", "#F1EDE2", "#DFD7C7", "#B2A9A9"]
                return args;
            });
        })(jQuery);
    </script>
    <?php }
add_action('acf/input/admin_footer', 'mother_acf_input_admin_footer');


function mother_comment_form_fields($args = array(), $post_id = null)
{
    if (null === $post_id)
        $post_id = get_the_ID();
    else
        $id = $post_id;

    $commenter = wp_get_current_commenter();
    $user = wp_get_current_user();
    $user_identity = $user->exists() ? $user->display_name : '';

    $args = wp_parse_args($args);
    if (! isset($args['format']))
        $args['format'] = current_theme_supports('html5', 'comment-form') ? 'html5' : 'xhtml';

    $req      = get_option('require_name_email');
    $aria_req = ($req ? " aria-required='true'" : '');
    $html5    = 'html5' === $args['format'];
    $fields   =  array(
        'author' =>
        '<p class="comment-form-author comment-input pe-2"><input id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) .
            '" size="30"' . $aria_req . ' /><label for="author">' . __('Name', 'domainreference') . '<span class="required">*</span></label></p>',

        'email' =>
        '<p class="comment-form-email comment-input ps-2"><input id="email" name="email" type="text" value="' . esc_attr($commenter['comment_author_email']) .
            '" size="30"' . $aria_req . ' /><label for="email">' . __('Email', 'domainreference') . '<span class="required">*</span></label></p>',

    );

    $fields = apply_filters('comment_form_default_fields', $fields);
    $defaults = array(
        'fields'               => $fields,
        'comment_field'        => '<p class="comment-form-comment"><textarea id="comment" name="comment" cols="45" rows="6" aria-required="true"></textarea></p>',
        'logged_in_as'         => '<p class="logged-in-as">' . sprintf(__('Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>', 'mother'), get_edit_user_link(), $user_identity, wp_logout_url(apply_filters('the_permalink', get_permalink($post_id)))) . '</p>',
        'id_form'              => 'commentform',
        'id_submit'            => 'submit',
        'title_reply'          => __('Write a <em>Comment</em>', 'mother'),
        'title_reply_to'       => __('Leave a Reply to %s', 'mother'),
        'cancel_reply_link'    => __('Cancel reply', 'mother'),
        'label_submit'         => __('Post', 'mother'),
        'format'               => 'xhtml',
    );
    return $defaults;
}

add_filter('comment_form_defaults', 'mother_comment_form_fields');
add_filter('comment_form_defaults', 'mother_custom_comment_form');
function mother_custom_comment_form($no_fields)
{
    $no_fields['comment_notes_before'] = '';
    return $no_fields;
}

function mother_comment($comment, $args, $depth)
{
    $GLOBALS['comment'] = $comment;
    switch ($comment->comment_type):
        case 'pingback':
        case 'trackback':
    ?>
            <li class="post pingback">
                <p><?php _e('Pingback:', 'cup-of-jo'); ?> <?php comment_author_link(); ?><?php edit_comment_link(__('Edit', 'cup-of-jo'), '<span class="edit-link">', '</span>'); ?></p>
            <?php
            break;
        default:
            ?>
            <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
                <article id="comment-<?php comment_ID(); ?>" class="comment">
                    <footer class="comment-meta">
                        <div class="comment-author vcard">
                            <span class="fn"><?php echo get_comment_author_link(); ?> says...</span>

                        </div><!-- .comment-author .vcard -->

                        <?php if ($comment->comment_approved == '0') : ?>
                            <em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.', 'cup-of-jo'); ?></em>
                            <br />
                        <?php endif; ?>

                    </footer>

                    <div class="comment-content"><?php comment_text(); ?></div>

                    <div class="comment-footer-meta">

                        <?php echo get_comment_date(); ?>
                        <?php comment_reply_link(array_merge($args, array('reply_text' => __('Reply', 'cup-of-jo'), 'depth' => $depth, 'max_depth' => $args['max_depth']))); ?>
                    </div><!-- .reply -->
                </article><!-- #comment-## -->

            <?php
            break;
    endswitch;
}

function magnific_popup_files()
{
    wp_enqueue_script('magnific', get_template_directory_uri() . '/assets/magnific-popup-gallery.min.js', array('jquery'), false, true);
    wp_enqueue_script('masonry', 'https://cdnjs.cloudflare.com/ajax/libs/masonry/1.3.1/jquery.masonry.min.js', array('jquery'), false, true);
}

add_action('wp_enqueue_scripts', 'magnific_popup_files');


function load_more_posts()
{
    check_ajax_referer('ajax-pagination-nonce', 'nonce');

    $page = $_POST['page'] + 1; // Next page
    $category = $_POST['category'];
    $search = isset($_POST['search']) ? sanitize_text_field($_POST['search']) : '';
    $author = isset($_POST['author']) ? $_POST['author'] : '';

    remove_all_filters('excerpt_length');
    add_filter('excerpt_length', function ($length) {
        return 20;
    }, 999);
    $per_page = !empty($search) ? 9 : 16;
    // if ($category) {
    //     $per_page = 8;
    // }

    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => $per_page,
        'paged' => $page,
    );

    $is_search = !empty($search);

    // Add search parameter if it exists
    if ($is_search) {
        $args['s'] = $search;
    } else if (!empty($category)) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'category',
                'field' => 'slug',
                'terms' => $category
            )
        );
    }

    if ($author) {
        $args['author'] = $author;
    }

    $query = new WP_Query($args);
    $response = array();

    if ($query->have_posts()) {
        ob_start();
        $counter = 1;

        while ($query->have_posts()) {
            $query->the_post();
            if ($is_search) {
                get_template_part('template-parts/content-search', get_post_type(), ['counter' => $counter]);
            } else {
                get_template_part('template-parts/content-category', get_post_type(), ['counter' => $counter]);
            }
            $counter++;
        }

        $response['html'] = ob_get_clean();
        $response['has_more_posts'] = ($query->max_num_pages > $page);

        wp_send_json_success($response);
    } else {
        wp_send_json_error();
    }

    wp_reset_postdata();
    die();
}
add_action('wp_ajax_load_more_posts', 'load_more_posts');
add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts');


function custom_search_form($form)
{
    $form = '<form role="search" method="get" class="search-form mt-4" action="' . home_url('/') . '" >
	  <div class="custom-form"><label class="screen-reader-text" for="s">' . __('Search:') . '</label>
	  <input class="input" type="text" value="' . get_search_query() . '" name="s" id="s" />
	  <input type="submit" class="btn" id="searchsubmit" value="Search" />
	</div>
	</form>';

    return $form;
}
add_filter('get_search_form', 'custom_search_form', 40);

add_filter('gform_confirmation_anchor_1', '__return_false');


function filter_post_thumbnail_html($html, $post_id, $post_thumbnail_id, $size, $attr)
{
    $image = get_field('image', $post_id);

    if ($image && !is_single()) {
        $alt_text = get_post_meta($image, '_wp_attachment_image_alt', true);
        $src = wp_get_attachment_image_src($image, $size);
        $html = '<img src="' .  $src[0] . '" alt=" ' . $alt_text . '" />';
    } else {
        $id = get_post_thumbnail_id();
        $alt_text = get_post_meta($id, '_wp_attachment_image_alt', true);
        $src = wp_get_attachment_image_src($id, $size);
        $html = '<img src="' . $src[0] . '" alt="' . $alt_text . '" />';
    }

    return $html;
};

function add_google_fonts_preconnect()
{
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
}
add_action('wp_head', 'add_google_fonts_preconnect');

function add_latest_post_preload() {
    if (!is_front_page() && !is_home()) return;

    $latest_post = new WP_Query([
        'post_type'      => 'post',
        'posts_per_page' => 1,
    ]);

    if ($latest_post->have_posts()) {
        $latest_post->the_post();

        $thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'large'); // or 'full'

        if ($thumbnail_url) {
            echo '<link rel="preload" as="home-image" fetchpriority="high" href="' . esc_url($thumbnail_url) . '" type="image/woff2" crossorigin="anonymous">' . "\n";
        }

        wp_reset_postdata();
    }
}
add_action('wp_head', 'add_latest_post_preload', 0); 


add_filter('post_thumbnail_html', 'filter_post_thumbnail_html', 10, 5);

function mytheme_customize_register($wp_customize)
{
    // Add section for custom images
    $wp_customize->add_section('custom_images_section', array(
        'title' => __('Custom Images', 'mytheme'),
        'priority' => 30,
    ));

    // Add setting for top left image
    $wp_customize->add_setting('top_left_image', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add control for top left image
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'top_left_image', array(
        'label' => __('Top Left Image', 'mytheme'),
        'section' => 'custom_images_section',
        'settings' => 'top_left_image',
    )));

    // Add setting for top right image
    $wp_customize->add_setting('top_right_image', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    // Add control for top right image
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'top_right_image', array(
        'label' => __('Top Right Image', 'mytheme'),
        'section' => 'custom_images_section',
        'settings' => 'top_right_image',
    )));
}
add_action('customize_register', 'mytheme_customize_register');

function modify_posts_per_page($query)
{
    if ($query->is_main_query()) {
        if (is_home()) {
            $query->set('posts_per_page', 16);
        } elseif (is_archive()) {
            $query->set('posts_per_page', 16);
        } elseif (is_search()) {  // Add this condition
            $query->set('posts_per_page', 9);
        }
    }
}
add_action('pre_get_posts', 'modify_posts_per_page');

function custom_excerpt_length($length)
{
    return 20;
}
add_filter('excerpt_length', 'custom_excerpt_length');

add_filter('upload_dir', 'use_live_site_uploads_url');

function use_live_site_uploads_url($uploads)
{
    // Replace 'https://your-live-site.com' with your actual live site URL
    $live_site_url = site_url();

    // Only modify the URL, not the local file path
    $uploads['baseurl'] = $live_site_url . '/wp-content/uploads';
    $uploads['url'] = $live_site_url . '/wp-content/uploads' . substr($uploads['url'], strlen($uploads['baseurl']));

    return $uploads;
}

function get_smart_date()
 {
     $post_date = get_post_time('U', false); // Unix timestamp of post time
     $current_date = current_time('timestamp');
     $one_week_ago = strtotime('-1 week', $current_date);
     // Check if the post was published today
     if (date('Y-m-d', $post_date) === date('Y-m-d', $current_date)) {
         return 'Today';
     } elseif ($post_date > $one_week_ago) {
         return get_the_date('l'); // Day name like "Monday"
     } else {
         return get_the_date('M j'); // Format like "Jun 5"
     }
 }

function get_update_date()
{
    $modified_time = get_post_modified_time('U', false); // ✅ Get last modified time as Unix timestamp
    $current_time = current_time('timestamp');           // Current time in WordPress timezone
    $one_week_ago = strtotime('-1 week', $current_time); // Timestamp for 1 week ago

    // Check if the post was updated today
    if (date('Y-m-d', $modified_time) === date('Y-m-d', $current_time)) {
        return 'Today';
    } elseif ($modified_time > $one_week_ago) {
        return get_the_modified_date('l'); // Day name like "Monday"
    } else {
        return get_the_modified_date('M j'); // Format like "Jul 5"
    }
}

/**
 * Allow SVG uploads
 */
function add_svg_support($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'add_svg_support');

/**
 * Fix SVG upload validation
 */
function fix_svg_upload_check($data, $file, $filename, $mimes)
{
    if (isset($data['ext']) && $data['ext'] === 'svg') {
        if (isset($data['type']) && $data['type'] === 'application/octet-stream') {
            $data['type'] = 'image/svg+xml';
        }
    }
    return $data;
}
add_filter('wp_check_filetype_and_ext', 'fix_svg_upload_check', 10, 4);

/**
 * Disable automatic hyperlinking of URLs in comments
 */
remove_filter('comment_text', 'make_clickable', 9);

/**
 * Block comments containing URLs
 */
function block_comments_with_urls($commentdata)
{
    $comment_content = $commentdata['comment_content'];

    // Pattern to match most URLs
    $url_pattern = '/(https?:\/\/[^\s<>"\']+|www\.[^\s<>"\']+)/i';

    // Check if comment contains URLs
    if (preg_match($url_pattern, $comment_content)) {
        wp_die('Comments containing URLs are not allowed.', 'Comment Blocked', array('response' => 403));
    }

    return $commentdata;
}
add_filter('preprocess_comment', 'block_comments_with_urls');

/**
 * Strip URLs from comment text (backup in case some slip through)
 */
function strip_comment_urls($comment_text)
{
    // Pattern to match most URLs
    $url_pattern = '/(https?:\/\/[^\s<>"\']+|www\.[^\s<>"\']+)/i';

    // Replace URLs with empty string
    $comment_text = preg_replace($url_pattern, '', $comment_text);

    return $comment_text;
}
add_filter('comment_text', 'strip_comment_urls', 10);


function get_products_from_blocks($post_id)
{
    $post = get_post($post_id);
    $blocks = parse_blocks($post->post_content);
    $products = [];

    foreach ($blocks as $block) {
        if ($block['blockName'] === 'custom-blocks/external-products') {
            if (!empty($block['attrs']['products'])) {
                $products = array_merge($products, $block['attrs']['products']);
            }
        }
    }

    return $products;
}

function add_sticky_products_bar()
{
    if (is_single()) {
        $products = get_products_from_blocks(get_the_ID());
        if (!empty($products)) {
            ?>
                <div class="sticky-products-bar">
                    <div class="shop-label">SHOP</div>
                    <div class="sticky-products-container">
                        <?php foreach ($products as $product) : ?>
                            <?php if (!empty($product['productUrl'])) : ?>
                                <a href="<?php echo esc_url($product['productUrl']); ?>" class="sticky-product" target="_blank" rel="noopener noreferrer">
                                <?php else: ?>
                                    <div class="sticky-product">
                                    <?php endif; ?>
                                    <div class="product-image">
                                        <?php if (!empty($product['mediaURL'])) : ?>
                                            <img src="<?php echo esc_url($product['mediaURL']); ?>" alt="<?php echo esc_attr($product['productTitle']); ?>">
                                        <?php endif; ?>
                                    </div>
                                    <div class="product-info">
                                        <?php if (!empty($product['productBrand'])) : ?>
                                            <div class="product-brand"><?php echo esc_html($product['productBrand']); ?></div>
                                        <?php endif; ?>
                                        <?php if (!empty($product['productTitle'])) : ?>
                                            <div class="product-title"><?php echo esc_html($product['productTitle']); ?></div>
                                        <?php endif; ?>
                                        <?php if (!empty($product['price'])) : ?>
                                            <div class="product-price">$<?php echo esc_html($product['price']); ?></div>
                                        <?php endif; ?>
                                    </div>
                                    <?php if (!empty($product['productUrl'])) : ?>
                                </a>
                            <?php else: ?>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
                </div>
                </div>
                <style>
                    .sticky-products-bar {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: white;
                        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                        z-index: 1000;
                        padding: 15px 0;
                        display: flex;
                        align-items: center;
                    }

                    .shop-label {
                        writing-mode: vertical-lr;
                        transform: rotate(180deg);
                        color: #AEADAD;
                        font-family: Outfit;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        letter-spacing: 2.4px;
                        text-transform: uppercase;
                        margin-left: 20px;
                    }

                    .sticky-products-container {
                        margin: 0 auto;
                        display: flex;
                        overflow-x: auto;
                        gap: 20px;
                        padding: 0 20px;
                    }

                    .sticky-product {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        min-width: 280px;
                        background: #fff;
                        padding: 10px;
                        border-radius: 8px;
                        text-decoration: none;
                        color: inherit;
                        transition: transform 0.2s ease;
                    }

                    .sticky-product:hover {
                        transform: translateY(-2px);
                    }

                    .product-image {
                        width: 60px;
                        height: 60px;
                        flex-shrink: 0;
                    }

                    .product-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 4px;
                    }

                    .product-info {
                        flex-grow: 1;
                        min-width: 0;
                    }

                    .product-brand {
                        color: #000;
                        font-family: Outfit;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 300;
                        line-height: normal;
                        letter-spacing: 0.6px;
                    }

                    .product-title {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #000;
                        font-family: "Romie Pro";
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                        letter-spacing: 0.8px;
                    }

                    .product-price {
                        color: #000;
                        font-family: Outfit;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 300;
                        line-height: normal;
                        letter-spacing: 0.6px;
                    }

                    @media (max-width: 768px) {
                        .sticky-product {
                            min-width: 220px;
                        }
                    }
                </style>
    <?php
        }
    }
}
add_action('wp_body_open', 'add_sticky_products_bar', 20);

function enqueue_paragraph_custom_width_script()
{
    wp_enqueue_script(
        'paragraph-custom-width',
        get_template_directory_uri() . '/paragraph-width.js', // adjust as needed
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-compose', 'wp-hooks'),
        filemtime(get_template_directory() . '/paragraph-width.js'),
        true
    );
}
// add_action('enqueue_block_editor_assets', 'enqueue_paragraph_custom_width_script');

function custom_paragraph_block_styles()
{


    register_block_style(
        'core/paragraph',
        [
            'name'  => 'fullwidth',
            'label' => 'Full Width',
            'inline_style' => '.wp-block-paragraph.is-style-fullwidth { width: 100vw; max-width: none; margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); }',
        ]
    );
}
add_action('init', 'custom_paragraph_block_styles');



add_action('init', function () {
    // Only add headers for REST or AJAX requests, adjust as needed
    if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false || defined('DOING_AJAX')) {
        header("Access-Control-Allow-Origin: *"); // Or specify the domain instead of '*'
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
});
    
