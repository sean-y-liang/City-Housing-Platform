<?php
require 'init.php';
$backup_dir = rtrim(__DIR__, '/') . '/db/';
$backup_file = $backup_dir . 'backup_' . date('Y-m-d_H-i-s') . '.sql';


// 打开一个文件用于写入备份数据
$file = fopen($backup_file, 'w');

// 循环遍历所有表
$tables = array();
$result = $mysqli->query("SHOW TABLES");
while ($row = $result->fetch_row()) {
    $tables[] = $row[0];
}

foreach ($tables as $table) {
    // 写入创建表结构的SQL语句
    $create_table_query = $mysqli->query("SHOW CREATE TABLE `$table`");
    $row2 = $create_table_query->fetch_assoc();
    fwrite($file, "\n\n" . $row2['Create Table'] . ";\n\n");

    // 写入表数据
    $data_query = "SELECT * FROM `$table`";
    $result = $mysqli->query($data_query);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $line = '';
            foreach ($row as $value) {
                if (isset($value)) { // 如果值不为空，则转义并添加引号
                    $value = addslashes($value);
                    $line .= "'$value', ";
                } else { // 如果值为空，则直接添加空字符串
                    $line .= "'' , ";
                }
            }

            // 去除末尾多余的逗号和空格
            $line = substr_replace(trim($line), "", -2);
            $line .= "\n";

            fwrite($file, "INSERT INTO `$table` VALUES ($line)");
        }
    }
}

// 关闭文件和数据库连接
fclose($file);
$mysqli->close();

echo "Database backup successfully created at: {$backup_file}";
?>