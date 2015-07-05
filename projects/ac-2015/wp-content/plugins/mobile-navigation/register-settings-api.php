<?php
if( ! class_exists( 'Register_Settings_API_Mobile_Navigation' ) ) {
	class Register_Settings_API_Mobile_Navigation {
		/**
		 * Init private variables
		 *
		 * @since 1.4
 		 */
		private $settings_array;
		private $args;

		/**
		 * Construct contains all actions that runs on init
		 *
		 * @since 1.4
 		 */
		function __construct() {
			add_action( 'init', array( $this, 'init_settings' ) );
			add_action( 'admin_menu', array( $this, 'menu_page' ) );
			add_action( 'admin_init', array( $this, 'register_fields' ) );
			add_action( 'admin_init', array( $this, 'register_callback' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'scripts' ) );
		}

		/**
		 * Init settings runs before admin_init
		 * Put $settings_array to private variable
		 * Add admin_head for scripts and styles
		 *
		 * @since 1.4
 		 */
		function init_settings() {
			if( is_admin() ) {
				$this->settings_array = apply_filters('register_settings_api_mobile_navigation', array());
				add_action( 'admin_head', array( $this, 'script') );
			}
		}

		/**
		 * Creating pages and menus from the settings_array
		 *
		 * @since 1.4
 		 */
		function menu_page() {
			foreach( $this->settings_array as $menu_slug => $options ) {
				if( ! empty( $options['page_title'] ) && ! empty( $options['menu_title'] ) && ! empty( $options['option_name'] ) ) {
					$options['capability'] = ( ! empty( $options['capability'] ) ) ? $options['capability'] : 'manage_options';
					add_options_page(
						$options['page_title'],
						$options['menu_title'],
						$options['capability'],
						$menu_slug,
						array( $this, 'render_options' )
					);
				}
			}
		}

		/**
		 * Register all fields and settings bound to it from the settings_array
		 *
		 * @since 1.4
 		 */
		function register_fields() {
			foreach( $this->settings_array as $page_id => $settings ) {
				if( ! empty( $settings['tabs'] ) && is_array( $settings['tabs'] ) ) {
					foreach( $settings['tabs'] as $tab_id => $item ) {
						$sanitized_tab_id = sanitize_title( $tab_id );
						$tab_description = ( ! empty( $item['tab_description'] ) ) ? $item['tab_description'] : '';
						$this->section_id = $sanitized_tab_id;
						$setting_args = array(
							'option_group' => 'section_page_' . $page_id . '_' . $sanitized_tab_id,
							'option_name' => $settings['option_name']
						);
						register_setting( $setting_args['option_group'], $setting_args['option_name'] );
						$section_args = array(
							'id' => 'section_id_' . $sanitized_tab_id,
							'title' => $tab_description,
							'callback' => 'callback',
							'menu_page' => $page_id . '_' . $sanitized_tab_id
						);
						add_settings_section(
							$section_args['id'],
							$section_args['title'],
							array( $this, $section_args['callback'] ),
							$section_args['menu_page']
						);
						if( ! empty( $item['fields'] ) && is_array( $item['fields'] ) ) {
							foreach( $item['fields'] as $field_id => $field ) {
								if( is_array( $field ) ) {
									$sanitized_field_id = sanitize_title( $field_id );
									$title = ( ! empty( $field['title'] ) ) ? $field['title'] : '';
									$field['field_id'] = $sanitized_field_id;
									$field['option_name'] = $settings['option_name'];
									$field_args = array(
										'id' => 'field' . $sanitized_field_id,
										'title' => $title,
										'callback' => 'render_fields',
										'menu_page' => $page_id . '_' . $sanitized_tab_id,
										'section' => 'section_id_' . $sanitized_tab_id,
										'args' => $field
									);
									add_settings_field(
										$field_args['id'],
										$field_args['title'],
										array( $this, $field_args['callback'] ),
										$field_args['menu_page'],
										$field_args['section'],
										$field_args['args']
									);
								}
							}
						}
					}
				}
			}
		}

		/**
		 * Register callback is used for the button field type when user click the button
		 *
		 * @since 1.4
 		 */
		function register_callback() {
			$is_settings_page = $this->is_settings_page();
			if( ! empty( $is_settings_page ) ) {
				if( ! empty( $_GET['callback'] ) ) {
					$nonce = wp_verify_nonce( $_GET['_wpnonce'] );
					if( ! empty( $nonce ) ) {
						if( function_exists( $_GET['callback'] ) ) {
							$message = call_user_func( $_GET['callback'] );
							update_option('rsa-message', $message);
							$url = admin_url('options-general.php?page=' . $_GET['page']);
							wp_redirect( $url );
							die;
						}
					}
				}
			}
		}

		/**
		 * Check if the current page is a settings page
		 *
		 * @since 1.4
 		 */
		function is_settings_page() {
			$menus = array();
			$get_page = ( ! empty( $_GET['page'] ) ) ? $_GET['page'] : '';
			foreach( $this->settings_array as $menu => $page ) {
				$menus[] = $menu;
			}

			if( in_array( $get_page, $menus ) )
				return true;
			else
				return false;
		}

		/**
		 * Return an array for the choices in a select field type
		 *
		 * @since 1.4
 		 */
		function select_choices() {
			$items = array();
			if( ! empty( $this->args['choices'] ) && is_array( $this->args['choices'] ) ) {
				foreach( $this->args['choices'] as $slug => $choice )
					$items[$slug] = $choice;
			}
			return $items;
		}

		/**
		 * Get values from built in WordPress functions
		 *
		 * @since 1.4
		 */
		function get() {
			if( ! empty( $this->args['get'] ) )
				$item_array = call_user_func_array( array( $this, 'get_' . $this->args['get'] ), array( $this->args ) );
			elseif( ! empty( $this->args['choices'] ) )
				$item_array = $this->select_choices( $this->args );
			else
				$item_array = array();
			return $item_array;
		}

		/**
		 * Get users from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_users() {
			$items = array();
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$users = get_users( $args );
			foreach( $users as $user )
				$items[$user->ID] = $user->display_name;
			return $items;
		}

		/**
		 * Get menus from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_menus() {
			$items = array();
			$menus = get_registered_nav_menus();
			if( ! empty( $menus ) ) {
				foreach( $menus as $location => $description )
					$items[$location] = $description;
			}
			return $items;
		}

		/**
		 * Get posts from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_posts() {
			$items = array();
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$the_query = new WP_Query( $args );
			if ( $the_query->have_posts() ) {
				while ( $the_query->have_posts() ) : $the_query->the_post();
					global $post;
					$items[$post->ID] = get_the_title();
				endwhile;
			}
			wp_reset_postdata();
			return $items;
		}

		/**
		 * Get terms from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_terms() {
			$items = array();
			$taxonomies = ( ! empty( $this->args['taxonomies'] ) ) ? $this->args['taxonomies'] : null;
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$terms = get_terms( $taxonomies, $args );
			if( ! empty( $terms ) ) {
				foreach( $terms as $key => $term )
					$items[$term->term_id] = $term->name;
			}
			return $items;
		}

		/**
		 * Get taxonomies from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_taxonomies() {
			$items = array();
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$taxonomies = get_taxonomies( $args, 'objects');
			if( ! empty( $taxonomies ) ) {
				foreach ( $taxonomies as $taxonomy )
					$items[$taxonomy->name] = $taxonomy->label;
			}
			return $items;
		}

		/**
		 * Get sidebars from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_sidebars() {
			$items = array();
			global $wp_registered_sidebars;
			if( ! empty( $wp_registered_sidebars ) ) {
				foreach ( $wp_registered_sidebars as $sidebar )
					$items[$sidebar['id']] = $sidebar['name'];
			}
			return $items;
		}

		/**
		 * Get themes from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_themes() {
			$items = array();
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$themes = wp_get_themes( $args );
			if( ! empty( $themes ) ) {
				foreach ( $themes as $key => $theme )
					$items[$key] = $theme->get( 'Name' );
			}
			return $items;
		}

		/**
		 * Get plugins from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_plugins() {
			$items = array();
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$plugins = get_plugins( $args );
			if( ! empty( $plugins ) ) {
				foreach ( $plugins as $key => $plugin )
					$items[$key] = $plugin['Name'];
			}
			return $items;
		}

		/**
		 * Get post_types from WordPress, used by the select field type
		 *
		 * @since 1.4
 		 */
		function get_post_types() {
			$items = array();
			$args = ( ! empty( $this->args['args'] ) ) ? $this->args['args'] : null;
			$post_types = get_post_types( $args, 'objects' );
			if( ! empty( $post_types ) ) {
				foreach ( $post_types as $key => $post_type )
					$items[$key] = $post_type->name;
			}
			return $items;
		}

		/**
		 * Find a selected value in select or multiselect field type
		 *
		 * @since 1.4
 		 */
		function selected( $key ) {
			if( $this->value_type() == 'array' )
				return $this->multiselected_value( $key );
			else
				return $this->selected_value( $key );
		}

		/**
		 * Return selected html if the value is selected in select field type
		 *
		 * @since 1.4
 		 */
		function selected_value( $key ) {
			$result = '';
			if( $this->value( $this->options, $this->args ) === $key )
				$result = ' selected="selected"';
			return $result;
		}

		/**
		 * Return selected html if the value is selected in multiselect field type
		 *
		 * @since 1.4
 		 */
		function multiselected_value( $key ) {
			$result = '';
			$value = $this->value( $this->options, $this->args, $key );
			if( is_array( $value ) && in_array( $key, $value ) )
				$result = ' selected="selected"';
			return $result;
		}

		/**
		 * Return checked html if the value is checked in radio or checkboxes
		 *
		 * @since 1.4
 		 */
		function checked( $slug ) {
			$value = $this->value();
			if( $this->value_type() == 'array' ) {
				$checked = ( ! empty( $value ) && in_array( $slug, $this->value() ) ) ? ' checked="checked"' : '';
			} else {
				$checked = ( ! empty( $value ) && $slug == $this->value() ) ? ' checked="checked"' : '';
			}
			return $checked;
		}

		/**
		 * Return the value. If the value is not saved the default value is used if exists in the settings_array.
		 * Return as string or array
		 *
		 * @since 1.4
 		 */
		function value( $key = null ) {
			$value = '';
			if( $this->value_type() == 'array' )
				$default = ( ! empty( $this->args['default'] ) && is_array( $this->args['default'] ) ) ? $this->args['default'] : array();
			else
				$default = ( ! empty( $this->args['default'] ) ) ? $this->args['default'] : '';
			$value = ( isset( $this->options[$this->args['field_id']] ) ) ? $this->options[$this->args['field_id']] : $default;
			return $value;
		}

		/**
		 * Check if the current value type is a single value or a multiple value field type, return string or array
		 *
		 * @since 1.4
 		 */
		function value_type() {
			$default_single = array(
				'select', 'radio', 'text', 'email', 'url',
				'color', 'date', 'number', 'password', 'colorpicker',
				'textarea', 'datepicker', 'tinymce', 'image', 'file'
			);
			$default_multiple = array( 'multiselect', 'checkbox' );
			$value = '';
			if( in_array( $this->args['type'], $default_single ) )
				return 'string';
			elseif( in_array( $this->args['type'], $default_multiple ) )
				return 'array';
		}

		/**
		 * Check if a checkbox has items
		 *
		 * @since 1.4
 		 */
		function has_items() {
			if( ! empty( $this->args['choices'] ) && is_array( $this->args['choices'] ) )
				return true;
		}

		/**
		 * Return the html name of the field
		 *
		 * @since 1.4
 		 */
		function name( $slug = '' ) {
			$option_name = sanitize_title( $this->args['option_name'] );
			if( $this->value_type() == 'array' )
				return $option_name . '[' . $this->args['field_id'] . '][' . $slug . ']';
			else
				return $option_name . '[' . $this->args['field_id'] . ']';
		}

		/**
		 * Return the size of a multiselect type. If not set it will calculate it
		 *
		 * @since 1.4
 		 */
		function size( $items ) {
			$size = '';
			if( $this->args['type'] == 'multiselect' ) {
				if( ! empty( $this->args['size'] ) ) {
					$count = $this->args['size'];
				} else {
					$count = count($items);
					$count = ( ! empty( $this->args['empty'] ) ) ? $count + 1 : $count;
				}
				$size = ' size="' . $count . '"';
			}
			return $size;
		}

		/**
		 * All the field types in html
		 *
		 * @since 1.4
 		 */
		function render_fields( $args ) {
			$screen = get_current_screen();
			$callback_base = admin_url() . $screen->parent_file;
			$this->args = $args;
			$options = get_option( $args['option_name'] );
			$this->options = $options;
			$option_name = sanitize_title( $args['option_name'] );
			$out = '';
			$args['field_id'] = sanitize_title( $args['field_id'] );
			if( ! empty( $args['type'] ) ) {
				switch( $args['type'] ) {
					case 'select':
					case 'multiselect':
						$multiple = ( $args['type'] == 'multiselect' ) ? ' multiple' : '';
						$items = $this->get( $args );
						$out .= '<select' .  $multiple . ' name="' . $this->name() . '"' . $this->size( $items ) . '>';
							if( ! empty( $args['empty'] ) )
								$out .= '<option value="" ' . $this->selected( '' ) . '>' . $args['empty'] . '</option>';

							foreach( $items as $key => $choice ) {
								$key = sanitize_title( $key );
								$out .= '<option value="' . $key . '" ' . $this->selected( $key ) . '>' . $choice . '</option>';
							}
						$out .= '</select>';
						break;
					case 'radio':
					case 'checkbox':
						if( $this->has_items() ) {
							$horizontal = ( isset( $args['align'] ) && (string) $args['align'] == 'horizontal' ) ? true : false;
							$out .= ( $horizontal === true ) ? '<p>' : '';
							foreach( $args['choices'] as $slug => $choice ) {
								$checked = $this->checked( $slug );
								$out .= ( $horizontal === false ) ? '<p>' : '';
								$out .= '<label>';
								$out .= '<input value="' . $slug . '" type="' . $args['type'] . '" name="' . $this->name( $slug ) . '"' . $checked . '>';
								$out .= $choice;
								$out .= '</label>';
								$out .= ( $horizontal === false ) ? '</p>' : '';
							}
							$out .= ( $horizontal === true ) ? '</p>' : '';
						}
						break;
					case 'text':
					case 'email':
					case 'url':
					case 'color':
					case 'date':
					case 'number':
					case 'password':
					case 'colorpicker':
					case 'datepicker':
						$out = '<input type="' . $args['type'] . '" value="' . $this->value() . '" name="' . $this->name() . '" class="' . $args['type'] . '" data-id="' . $args['field_id'] . '">';
						break;
					case 'textarea':
						$rows = ( isset( $args['rows'] ) ) ? $args['rows'] : 5;
						$out .= '<textarea rows="' . $rows . '" class="large-text" name="' . $this->name() . '">' . $this->value() . '</textarea>';
						break;
					case 'tinymce':
						$rows = ( isset( $args['rows'] ) ) ? $args['rows'] : 5;
						$tinymce_settings = array(
							'textarea_rows' => $rows,
							'textarea_name' => $option_name . '[' . $args['field_id'] . ']',
						);
						wp_editor( $this->value(), $args['field_id'], $tinymce_settings );
						break;
					case 'image':
						$image_obj = ( ! empty( $options[$args['field_id']] ) ) ? wp_get_attachment_image_src( $options[$args['field_id']], 'thumbnail' ) : '';
						$image = ( ! empty( $image_obj ) ) ? $image_obj[0] : '';
						$upload_status = ( ! empty( $image_obj ) ) ? ' style="display: none"' : '';
						$remove_status = ( ! empty( $image_obj ) ) ? '' : ' style="display: none"';
						$value = ( ! empty( $options[$args['field_id']] ) ) ? $options[$args['field_id']] : '';
						?>
						<div data-id="<?php echo $args['field_id']; ?>">
							<div class="upload" id="<?php echo $args['field_id']; ?>"<?php echo $upload_status; ?>>
								<a href="#">Upload</a>
							</div>
							<div class="image"><img src="<?php echo $image; ?>" id="<?php echo $args['field_id']; ?>" /></div>
							<div class="remove"<?php echo $remove_status; ?>>
								<a href="#">Remove</a>
							</div>
							<input type="hidden" class="attachment_id" value="<?php echo $value; ?>" name="<?php echo $option_name; ?>[<?php echo $args['field_id']; ?>]">
						</div>
						<?php
						break;
					case 'file':
						$file_url = ( ! empty( $options[$args['field_id']] ) ) ? wp_get_attachment_url( $options[$args['field_id']] ) : '';
						$upload_status = ( ! empty( $file_url ) ) ? ' style="display: none"' : '';
						$remove_status = ( ! empty( $file_url ) ) ? '' : ' style="display: none"';
						$value = ( ! empty( $options[$args['field_id']] ) ) ? $options[$args['field_id']] : '';
						?>
						<div data-id="<?php echo $args['field_id']; ?>">
							<div class="upload" id="<?php echo $args['field_id']; ?>"<?php echo $upload_status; ?>>
								<a href="#">Upload</a>
							</div>
							<div class="url">
								<code title="Attachment ID: <?php echo $value; ?>" id="<?php echo $args['field_id']; ?>">
									<?php echo $file_url; ?>
								</code>
							</div>
							<div class="remove"<?php echo $remove_status; ?>>
								<a href="#">Remove</a>
							</div>
							<input type="hidden" class="attachment_id" value="<?php echo $value; ?>" name="<?php echo $option_name; ?>[<?php echo $args['field_id']; ?>]">
						</div>
						<?php
						break;
					case 'button':
						$warning_message = ( ! empty( $args['warning-message'] ) ) ? $args['warning-message'] : 'Unsaved settings will be lost. Continue?';
						$warning = ( ! empty( $args['warning'] ) ) ? ' onclick="return confirm(' . "'" . $warning_message . "'" . ')"' : '';
						$label = ( ! empty( $args['label'] ) ) ? $args['label'] : '';
						$complete_url = wp_nonce_url( admin_url('options-general.php?page=' . $_GET['page'] . '&callback=' . $args['callback'] ) );

						?>
						<a href="<?php echo $complete_url; ?>" class="button button-secondary"<?php echo $warning; ?>><?php echo $label; ?></a>
						<?php
						break;
					case 'custom':
						$value = ! empty( $options[$args['field_id']] ) ? $options[$args['field_id']] : null;
						$data = array(
							'value' => $value,
							'name' => $this->name(),
							'args' => $args
						);
						call_user_func( $args['callback'], $data );
						break;
				}
			}
			echo $out;
			if( ! empty( $args['description'] ) ) {
				echo '<p class="description">' . $args['description'] . '</div>';
			}
		}

		/**
		 * Callback for field registration. It's required by WordPress but not used by this plugin
		 *
		 * @since 1.4
 		 */
		function callback() { }

		/**
		 * Final output on the settings page
		 *
		 * @since 1.4
 		 */
		function render_options() {
			global $wp_settings_sections;
			$page = $_GET['page'];
			$settings = $this->settings_array[$page];
			$message = get_option('rsa-message');
			if( ! empty( $settings['tabs'] ) && is_array( $settings['tabs'] ) ) {
				$tab_count = count($settings['tabs']);
				?>
				<div class="wrap">
					<?php if( ! empty( $settings['before_tabs_text'] ) ) echo $settings['before_tabs_text']; ?>
					<form action='options.php' method='post'>
						<?php if( $tab_count > 1 ) : ?>
							<h2 class="nav-tab-wrapper">
								<?php
									$i = 0;
									foreach( $settings['tabs'] as $settings_id => $section ) {
										$sanitized_id = sanitize_title( $settings_id );
										$tab_title = ( ! empty( $section['tab_title'] ) ) ? $section['tab_title'] : $sanitized_id;
										$active = ( $i == 0 ) ? ' nav-tab-active' : '';
										echo '<a class="nav-tab nav-tab-' . $sanitized_id . $active . '" href="#tab-content-' . $sanitized_id . '">' . $tab_title . '</a>';
										$i++;
									}
									
								?>
							</h2>

							<?php if( ! empty( $message ) ) : ?>
								<div class="updated settings-error"> 
									<p><strong><?php echo $message; ?></strong></p>
								</div>
								<?php update_option('rsa-message', ''); ?>
							<?php endif; ?>
						<?php endif; ?>
						<?php
						$i = 0;
						foreach( $settings['tabs'] as $settings_id => $section ) {
							$sanitized_id = sanitize_title( $settings_id );
							$page_id = $_GET['page'] . '_' . $sanitized_id;
							$display = ( $i == 0 ) ? ' style="display: block;"' : ' style="display:none;"';
							echo '<div class="tab-content" id="tab-content-' . $sanitized_id . '"' . $display . '>';
							echo settings_fields( 'section_page_' . $_GET['page'] . '_' . $sanitized_id );
							do_settings_sections( $page_id );
							echo '</div>';
							$i++;
						}
						$complete_url = wp_nonce_url( admin_url('options-general.php?page=' . $_GET['page'] . '&callback=rsa_delete_settings' ) );
						?>
						<?php submit_button(); ?>
					</form>
					<?php
						if( ! empty( $settings['after_tabs_text'] ) ) {
							echo $settings['after_tabs_text'];
						}
					?>
				</div>
				<?php
			}
		}

		/**
		 * Register scripts and styles
		 *
		 * @since 1.4
 		 */
		function scripts() {
			$is_settings_page = $this->is_settings_page();
			if( ! empty( $is_settings_page ) ) {
				wp_enqueue_media();
				wp_enqueue_style( 'wp-color-picker' );
				wp_enqueue_script( 'wp-color-picker' );
				wp_enqueue_style('jquery-ui-css', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/flick/jquery-ui.css');
				wp_enqueue_script( 'jquery-ui-datepicker' );
			}
		}

		/**
		 * Inline scripts and styles
		 *
		 * @since 1.4
 		 */
		function script() {
			$is_settings_page = $this->is_settings_page();
			if( ! empty( $is_settings_page ) ) {
			?>
			<style>
				.image img {
					border: 1px solid #ddd;
					vertical-align: bottom;
				}
				.image img:hover {
					cursor: pointer;
				}
				.nav-tab:focus {
					outline: none;
					-webkit-box-shadow: none;
					box-shadow: none;
				}
				.rsa-delete {
					color: #a00;
				}
				.rsa-delete:hover {
					color: red;
				}
			</style>
			<script>
			jQuery(document).ready(function($) {
				// Upload attachment
				$('.upload, .image img, .url code').click(function(e) {
					e.preventDefault();
					console.log(wp.media);
					var send_attachment_bkp = wp.media.editor.send.attachment;
					var data_id = $(this).attr('id');
					wp.media.editor.send.attachment = function(props, attachment) {
						var current = '[data-id="' + data_id + '"]';
						if( attachment.sizes && attachment.sizes.thumbnail && attachment.sizes.thumbnail.url ) {
							$(current + ' .image img').attr('src', attachment.sizes.thumbnail.url);
						}
						$(current + ' .url code').html(attachment.url).show();
						$(current + ' .attachment_id').val(attachment.id);
						$(current + ' .remove').show();
						$(current + ' .upload').hide();
						wp.media.editor.send.attachment = send_attachment_bkp;
					}
					wp.media.editor.open();
					return false;
				});

				// Remove attachment
				$('.remove').click(function(e) {
					e.preventDefault();
					var data_id = $(this).parent().attr('data-id');
					var current = '[data-id="' + data_id + '"]';
					$(current + ' .url code').html('').hide();
					$(current + ' .attachment_id').val('');
					$(current + ' .image img').attr('src', '');
					$(current + ' .remove').hide();
					$(current + ' .upload').show();
					console.log(data_id);
				});

				// Add color picker to fields
				if( $('.colorpicker').length ) {
					$('.colorpicker').wpColorPicker();
				}

				// Nav click toggle
				if( $('.nav-tab').length ) {
					$( '.nav-tab' ).click(function(e) {
						e.preventDefault();
						var id = $(this).attr('href').substr(1);

						$('.tab-content').hide();
						$('#' + id).show();

						$('.nav-tab').removeClass('nav-tab-active')
						$(this).addClass('nav-tab-active');
					});
				}

				<?php
					$settings_array = $this->settings_array;
					foreach( $settings_array as $page ) {
						foreach( $page['tabs'] as $tab ) {
							foreach( $tab['fields'] as $field_key => $field ) {
								if($field['type'] == 'datepicker') {
									$date_format = ( ! empty( $field['format'] ) )? $field['format'] : 'yy-mm-dd';
									?>
									$( '[data-id="<?php echo $field_key; ?>"]' ).datepicker({
										dateFormat: '<?php echo $date_format; ?>'
									});
									<?php
								}
							}
						}
					}
				?>
			});
			</script>
			<?php
			}
		}
	}
	$settings_api = new Register_Settings_API_Mobile_Navigation();
}