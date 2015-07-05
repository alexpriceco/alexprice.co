<?php
add_filter('register_settings_api_mobile_navigation', 'menu_navigation_settings');

function menu_navigation_settings( $options_page ) {
	$mobile_navigation = new Mobile_Navigation();
	$not_writable_message = '';
	if( $mobile_navigation->is_writable() === false ) {
		if( empty( $mobile_navigation->options['enable_css'] ) ) {
			
				$not_writable_message = '<div id="message" class="error"><p>Files and folders are not writable. Cannot save the generated CSS.</p>';
				$generated_css = $mobile_navigation->generated_css();
				if( ! empty( $generated_css ) && ! empty( $_GET['settings-updated'] ) && $_GET['settings-updated'] == 'true' ) {
					$not_writable_message .= '<p>Copy paste the code below to your theme CSS.</p>';
					$not_writable_message .= '<pre><code>' . $generated_css . '</code></pre>';
				}
			
		}
		$not_writable_message .= '</div>';
	}
	$options_page['mobile-navigation'] = array(
		'menu_title' => 'Mobile navigation',
		'page_title' => 'Mobile navigation',
		'capability' => 'manage_options',
		'option_name' => 'mobile_navigation',
		'before_tabs_text' => $not_writable_message . '<h2>Mobile Navigation</h2>',
		'tabs' => array(
			'general' => array(
				'tab_title' => 'General',
				'tab_description' => '',
				'fields' => array(
					'menu_location' => array(
						'type' => 'select',
						'get' => 'menus',
						'empty' => 'Pages (no menu selected)',
						'title' => 'Menu location',
						'description' => 'Go to <a href="' . admin_url('nav-menus.php') . '">nav menus</a> to add some items.'
					),
					'breakpoint' => array(
						'type' => 'number',
						'title' => 'Mobile breakpoint (px)',
						'description' => 'Breakpoint when showing / hiding the mobile navigation. If not set <code>600px</code> will be used.'
					),
					'background' => array(
						'type' => 'colorpicker',
						'title' => 'Background color',
						'description' => 'The background color of your mobile navigation.'
					),
					'text_brightness' => array(
						'type' => 'select',
						'choices' => array(
							'' => 'Bright',
							'dark' => 'Dark',
						),
						'title' => 'Text brightness',
						'description' => 'Choose <code>Bright</code> for a dark background and <code>Dark</code> for a bright background.'
					),
					'menu_font_family' => array(
						'type' => 'text',
						'title' => 'Menu font family',
						'description' => 'Font family to be used in the menu item list.'
					),
				),
			),
			'logo' => array(
				'tab_title' => 'Logo',
				'tab_description' => '',
				'fields' => array(
					'logo_image' => array(
						'type' => 'image',
						'title' => 'Logo as image',
						'description' => "When using this option, don't use \"Logo as text\"."
					),
					'logo_text' => array(
						'type' => 'text',
						'title' => 'Logo as text',
						'description' => "When using this option, don't use \"Logo as image\"."
					),
					'logo_font_family' => array(
						'type' => 'text',
						'title' => 'Logo as text font family',
						'description' => "When using this option, don't use \"Logo as image\"."
					),
				),
			),
			'advanced' => array(
				'tab_title' => 'Advanced',
				'tab_description' => '',
				'fields' => array(
					'enable_mobile_navigation' => array(
						'type' => 'select',
						'choices' => array(
							'' => 'Active',
							'inactive' => 'Inactive',
						),
						'title' => 'Mobile navigation',
						'description' => 'When inactive the mobile navigation is completely disabled (including CSS and JS).'
					),
					'enable_register_menu' => array(
						'type' => 'select',
						'choices' => array(
							'' => 'Active',
							'inactive' => 'Inactive',
						),
						'title' => 'Register menu location',
						'description' => 'If you disable this option, make sure to have a menu location ready in your theme.'
					),
					'enable_css' => array(
						'type' => 'select',
						'choices' => array(
							'' => 'File',
							'inline' => 'Inline',
							'inactive' => 'Disabled',
						),
						'title' => 'CSS',
						'description' => '<code>File</code> is strongly recomended. Only use <code>Inline</code>if your files are not writable.'
					),
					'enable_js' => array(
						'type' => 'select',
						'choices' => array(
							'' => 'Active',
							'inactive' => 'Inactive',
						),
						'title' => 'Javascript',
						'description' => 'If the JS is not active the menu might not work.'
					),
					'hide_on_scroll' => array(
						'type' => 'select',
						'choices' => array(
							'' => 'Active',
							'inactive' => 'Inactive',
						),
						'title' => 'Hide on scroll',
						'description' => 'When scrolling down, show or hide the mobile navigation.'
					),
					'custom_css' => array(
						'type' => 'textarea',
						'title' => 'Custom CSS',
						'size' => 10,
						'description' => 'If CSS is active, it will include the custom CSS in this field.'
					),
				),
			),
		),
	);
	return $options_page;
}