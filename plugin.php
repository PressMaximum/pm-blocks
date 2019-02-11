<?php
/**
 * Plugin Name: PM Blocks
 * Plugin URI: https://pressmaximum.com/pm-blocks
 * Description: pm-blocks — is a Gutenberg plugin created via create-guten-block.
 * Author: pressmaximum
 * Author URI: https://pressmaximum.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

define( 'PM_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'PM_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'PM_BLOCKS_VERSION', '1.0.0' );
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
add_action( 'plugins_loaded', 'pm_blocks_plugin_init' );
function pm_blocks_plugin_init() {
	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
	require_once plugin_dir_path( __FILE__ ) . 'src/components/fonts/fonts.php';
	require_once plugin_dir_path( __FILE__ ) . 'src/components/icon-picker/icon-picker.php';
	require_once plugin_dir_path( __FILE__ ) . 'src/helper/meta-box.php';
}
