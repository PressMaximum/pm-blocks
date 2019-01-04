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
define( 'PM_BLOCK_URL', plugin_dir_url( __FILE__ ) );
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
require_once plugin_dir_path( __FILE__ ) . 'src/components/fonts/fonts.php';
