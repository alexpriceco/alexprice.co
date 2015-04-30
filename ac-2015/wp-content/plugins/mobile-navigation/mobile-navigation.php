<?php
/*
Plugin Name: Mobile Navigation
Plugin URI: http://www.wp-load.com
Description:
Version: 1.5
Author: Jens Törnell
Author URI: http://www.wp-load.com
*/

include 'register-settings-api.php';
include 'settings-array.php';

$mobile_navigation = new Mobile_Navigation();

class Mobile_Navigation {
	public $options;

	function __construct() {
		$this->options = get_option('mobile_navigation');
		if( empty( $this->options['enable_register_menu'] ) ) {
			add_action( 'after_setup_theme', array( $this, 'register_menus' ), 1 );
		}
		if( empty( $this->options['enable_mobile_navigation'] ) ) {
			if( empty( $this->options['enable_js'] ) ) {
				add_action( 'wp_head', array( $this, 'inline_script' ) );
			}
			add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
			add_action( 'mn_nav', array( $this, 'render_menu' ) );
			add_action( 'wp_footer', array( $this, 'render_footer' ) );
		}
		add_action( 'admin_init', array( $this, 'save_css' ) );
	}

	function save_css() {
		if( $this->is_writable() ) {
			if( ! empty( $_GET['page'] ) && $_GET['page'] == 'mobile-navigation' && ! empty( $_GET['settings-updated'] ) ) {
				$style_dir = plugin_dir_path( __FILE__ );
				$style = $this->generated_css();
				file_put_contents($style_dir . 'css/generated.css', $style);
			}
		}
	}

	function generated_css() {
		$style = '';
		if( ! empty( $this->options ) ) {
			$style_dir = plugin_dir_path( __FILE__ );
			$style_file = $style_dir . 'css/style.css';
			$style_data = file_get_contents( $style_file );
			$breakpoint = ( ! empty( $this->options['breakpoint'] ) ) ? $this->options['breakpoint'] : 600;
			$style = str_replace(
				array(
					'600',
					'/*** logo-font-family ***/',
					'/*** menu-font-family ***/',
					'/*** background ***/'
				),
				array(
					$breakpoint,
					"font-family: '" . $this->options['logo_font_family'] . "';",
					"font-family: '" . $this->options['menu_font_family'] . "';",
					"background: " . $this->options['background'] . ";"
				),
				$style_data
			);
			if( ! empty( $this->options['custom_css'] ) ) {
				$style .= "\n" . $this->options['custom_css'];
			}
		}
		return $style;
	}

	function is_writable() {
		$dir_path = plugin_dir_path( __FILE__ );
		$dir_path_css = $dir_path . 'css/';
		$generated_path = $dir_path_css . 'generated.css';
		if( file_exists( $generated_path ) && is_writable( $generated_path ) ) {
			$writable = true;
		} elseif( file_exists( $generated_path ) && ! is_writable( $generated_path ) ) {
			$writable = false;
		} elseif( is_writable( $dir_path_css ) ) {
			$writable = true;
		} else {
			$writable = false;
		}
		return $writable;
	}

	function register_menus() {
		register_nav_menu( 'mobile_navigation_menu', 'Mobile Navigation' );
	}

	function scripts() {
		if( empty( $this->options['enable_css'] ) ) {
			$dir = plugin_dir_path( __FILE__ );
			if( file_exists( $dir . 'css/generated.css') ) {
		 		wp_register_style( 'mobile_navigation_style', plugins_url( '/css/generated.css', __FILE__) );
		 	} else {
		 		wp_register_style( 'mobile_navigation_style', plugins_url( '/css/style.css', __FILE__) );
		 	}
		 	wp_enqueue_style( 'mobile_navigation_style' );
		 }
		 if( empty( $this->options['enable_js'] ) ) {
		 	wp_enqueue_script( 'script-name', plugins_url( '/js/custom.js', __FILE__), array('jquery'), '1.0.0', true );
		 }
	}

	function render_menu() {
		if( ! empty( $this->options['menu_location'] ) ) {
			$mobile_args = array(
				'theme_location'  => $this->options['menu_location'],
				'container'       => false,
				'menu_class'      => 'mobile-navigation',
				'menu_id'         => '',
				'echo'            => false,
				'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
				'depth'           => 0,
			);
		} else {
			$args = array(
				'depth'        => 0,
				'echo'         => 0,
				'title_li'     => '', 
			);
			$pages = wp_list_pages($args);
		}
		$brightness = ( ! empty( $this->options['text_brightness'] ) ) ? ' mn-' . $this->options['text_brightness'] : '';
		?>
		<div class="mn-navigation-wrap<?php echo $brightness; ?>">
			<?php if( ! empty( $this->options['logo_text'] ) ) : ?>
				<div class="mn-logo-text"><a href="<?php echo home_url(); ?>"><?php echo $this->options['logo_text']; ?></a></div>
			<?php endif; ?>
			<?php if( ! empty( $this->options['logo_image'] ) ) : ?>
				<div class="mn-logo-image"><a href="<?php echo home_url(); ?>"><?php echo wp_get_attachment_image( $this->options['logo_image'], 'full' ); ?></a></div>
			<?php endif; ?>
			<div class="mn-icon-wrap">
				<div class="icono-bars"></div>
				<div class="icono-cross"></div>
			</div>
			<?php do_action('rmm_icons'); ?>
			<div class="mn-menu-wrap">
				<?php if( ! empty( $this->options['menu_location'] ) ) : ?>
					<?php echo wp_nav_menu( $mobile_args ); ?>
				<?php elseif( ! empty( $pages ) ) : ?>
					<ul><?php echo $pages; ?></ul>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	function render_footer() {
		$mn_nav = did_action('mn_nav');
		if( empty( $mn_nav ) ) {
			$this->render_menu();
		}
	}

	function color_brightness($bg){
		$r = hexdec(substr($bg,0,2));
		$g = hexdec(substr($bg,2,2));
		$b = hexdec(substr($bg,4,2));

		$contrast = sqrt(
			$r * $r * .241 +
			$g * $g * .691 +
			$b * $b * .068
		);

		if($contrast > 130){
			return 'dark';
		} else {
			return 'bright';
    	}
	}

	function inline_script() {
		$o = $this->options;
		if( ! empty( $o['enable_css'] ) && $o['enable_css'] == 'inline' ) : ?>
			<style>
			<?php echo $this->generated_css(); ?>
			</style>
		<?php endif; ?>
		<?php
		$breakpoint_js = ( ! empty( $o['breakpoint'] ) ) ? 'breakpoint: ' . $o['breakpoint'] . ",\n" : '';
		$hide_on_scroll_js = ( empty( $o['hide_on_scroll'] ) ) ? "hide_on_scroll: true" . ",\n" : "hide_on_scroll: false" . ",\n";
		?>
		<script>
			jQuery(document).ready(function($) {
				mobile_navigation({
					<?php echo $breakpoint_js; ?>
					<?php echo $hide_on_scroll_js; ?>
				});
			});
		</script>
		<?php
	}
}