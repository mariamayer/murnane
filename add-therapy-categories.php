<?php
/**
 * Script to add therapy categories to WordPress
 * 
 * Usage: 
 * 1. Upload this file to your WordPress root directory
 * 2. Access it via browser: yoursite.com/add-therapy-categories.php
 * 3. Delete the file after running for security
 */

// Load WordPress
require_once('wp-load.php');

// Check if user is logged in and has admin privileges
if (!current_user_can('manage_options')) {
    wp_die('You do not have sufficient permissions to access this page.');
}

echo "<h1>Adding Therapy Categories</h1>";

// Define the parent category
$parent_category = array(
    'name' => 'Modalities',
    'slug' => 'modalities',
    'description' => 'Therapeutic modalities and approaches'
);

// Define the sub-categories
$sub_categories = array(
    array('name' => 'CBT', 'slug' => 'cbt', 'description' => 'Cognitive Behavioral Therapy'),
    array('name' => 'DBT', 'slug' => 'dbt', 'description' => 'Dialectical Behavior Therapy'),
    array('name' => 'IFS', 'slug' => 'ifs', 'description' => 'Internal Family Systems'),
    array('name' => 'Attachment Focused', 'slug' => 'attachment-focused', 'description' => 'Attachment Focused Therapy'),
    array('name' => 'Person Centered', 'slug' => 'person-centered', 'description' => 'Person Centered Therapy'),
    array('name' => 'Mindfulness', 'slug' => 'mindfulness', 'description' => 'Mindfulness Based Therapy'),
    array('name' => 'Ketamine Assisted Therapy', 'slug' => 'ketamine-assisted-therapy', 'description' => 'Ketamine Assisted Therapy'),
    array('name' => 'Acceptance Commitment Therapy (ACT)', 'slug' => 'acceptance-commitment-therapy', 'description' => 'Acceptance and Commitment Therapy'),
    array('name' => 'Eye Movement Desensitization and Reprocessing (EMDR)', 'slug' => 'emdr', 'description' => 'Eye Movement Desensitization and Reprocessing'),
    array('name' => 'Strength Based', 'slug' => 'strength-based', 'description' => 'Strength Based Therapy')
);

// Create parent category
echo "<h2>Creating Parent Category</h2>";
$parent_result = wp_insert_term(
    $parent_category['name'],
    'portfolio_category', // Assuming you're using portfolio_category taxonomy
    array(
        'slug' => $parent_category['slug'],
        'description' => $parent_category['description']
    )
);

if (is_wp_error($parent_result)) {
    echo "<p style='color: red;'>Error creating parent category: " . $parent_result->get_error_message() . "</p>";
    if ($parent_result->get_error_code() === 'term_exists') {
        echo "<p>Parent category already exists. Getting existing category...</p>";
        $parent_term = get_term_by('slug', $parent_category['slug'], 'portfolio_category');
        $parent_id = $parent_term->term_id;
    }
} else {
    echo "<p style='color: green;'>✓ Parent category '{$parent_category['name']}' created successfully (ID: {$parent_result['term_id']})</p>";
    $parent_id = $parent_result['term_id'];
}

// Create sub-categories
echo "<h2>Creating Sub-Categories</h2>";
foreach ($sub_categories as $sub_category) {
    $sub_result = wp_insert_term(
        $sub_category['name'],
        'portfolio_category',
        array(
            'slug' => $sub_category['slug'],
            'description' => $sub_category['description'],
            'parent' => $parent_id
        )
    );
    
    if (is_wp_error($sub_result)) {
        if ($sub_result->get_error_code() === 'term_exists') {
            echo "<p style='color: orange;'>⚠ Sub-category '{$sub_category['name']}' already exists</p>";
        } else {
            echo "<p style='color: red;'>✗ Error creating sub-category '{$sub_category['name']}': " . $sub_result->get_error_message() . "</p>";
        }
    } else {
        echo "<p style='color: green;'>✓ Sub-category '{$sub_category['name']}' created successfully (ID: {$sub_result['term_id']})</p>";
    }
}

echo "<h2>Summary</h2>";
echo "<p>Script completed. Please delete this file for security reasons.</p>";

// Display all categories for verification
echo "<h2>Verification - All Categories</h2>";
$all_categories = get_terms(array(
    'taxonomy' => 'portfolio_category',
    'hide_empty' => false,
    'parent' => 0
));

echo "<ul>";
foreach ($all_categories as $category) {
    echo "<li><strong>{$category->name}</strong> (ID: {$category->term_id})";
    
    // Get sub-categories
    $sub_cats = get_terms(array(
        'taxonomy' => 'portfolio_category',
        'hide_empty' => false,
        'parent' => $category->term_id
    ));
    
    if (!empty($sub_cats)) {
        echo "<ul>";
        foreach ($sub_cats as $sub_cat) {
            echo "<li>{$sub_cat->name} (ID: {$sub_cat->term_id})</li>";
        }
        echo "</ul>";
    }
    echo "</li>";
}
echo "</ul>";

echo "<p><strong>Note:</strong> Remember to delete this file after running the script!</p>";
?> 