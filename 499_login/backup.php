<?php
require 'init.php';
$backup_dir = rtrim(__DIR__, '/') . '/db/';
$backup_file = $backup_dir . 'backup_' . date('Y-m-d_H-i-s') . '.sql';


$file = fopen($backup_file, 'w');

$tables = array();
$result = $mysqli->query("SHOW TABLES");
while ($row = $result->fetch_row()) {
    $tables[] = $row[0];
}

foreach ($tables as $table) {
    $create_table_query = $mysqli->query("SHOW CREATE TABLE `$table`");
    $row2 = $create_table_query->fetch_assoc();
    fwrite($file, "\n\n" . $row2['Create Table'] . ";\n\n");

    $data_query = "SELECT * FROM `$table`";
    $result = $mysqli->query($data_query);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $line = '';
            foreach ($row as $value) {
                if (isset($value)) {
                    $value = addslashes($value);
                    $line .= "'$value', ";
                } else {
                    $line .= "'' , ";
                }
            }

            $line = substr_replace(trim($line), "", -2);
            $line .= "\n";

            fwrite($file, "INSERT INTO `$table` VALUES ($line)");
        }
    }
}

fclose($file);
$mysqli->close();

echo "Database backup successfully created at: {$backup_file}";
?>