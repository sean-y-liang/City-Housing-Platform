<?php
require 'init.php';
$backup_dir = rtrim(__DIR__, '/') . '/db/';
$backup_file = $backup_dir . 'backup_' . date('Y-m-d_H-i-s') . '.sql';


// Open a file for backing up
$file = fopen($backup_file, 'w');

// Iterate through all tables by using while loop
$tables = array();
$result = $mysqli->query("SHOW TABLES");
while ($row = $result->fetch_row()) {
    $tables[] = $row[0];
}

foreach ($tables as $table) {
    // create the structure of table
    $create_table_query = $mysqli->query("SHOW CREATE TABLE `$table`");
    $row2 = $create_table_query->fetch_assoc();
    fwrite($file, "\n\n" . $row2['Create Table'] . ";\n\n");

    // back up data
    $data_query = "SELECT * FROM `$table`";
    $result = $mysqli->query($data_query);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $line = '';
            foreach ($row as $value) {
                if (isset($value)) {
                    $value = addslashes($value);
                    $line .= "'$value', ";
                } else { // If the value is empty, add empty string
                    $line .= "'' , ";
                }
            }

            //Delete extra commas and spaces at the end
            $line = substr_replace(trim($line), "", -2);
            $line .= "\n";

            fwrite($file, "INSERT INTO `$table` VALUES ($line)");
        }
    }
}

// Close the file and connection
fclose($file);
$mysqli->close();

echo "Database is backed up successfully at: {$backup_file}";
?>