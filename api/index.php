<?php
header('Content-Type: application/json');

// Example api working for testing purposes

/**
 * This zone is for configuration of mysql database access
 */
$host = 'localhost:3306';
$username = 'username';    /* replace with real values */
$password = 'password';    /* replace with real values */
$dbname = 'database';      /* replace with real values */

$response = array();

try
{
    $conn = new PDO('mysql:host='.$host.';dbname='.$dbname, $username, $password, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION ]);

    try
    {
        $sql = "SELECT * FROM data_collation".$condition;
        $statement = $conn->prepare($sql);
        $statement->execute();
        return $statement->fetchAll();
    }
    catch(PDOException $e)
    {
        $response['status'] = 'Query error';
    }

}
catch(PDOException $e)
{
    unset($conn);
    $response['status'] = 'Database connection error';
}

echo json_encode($response);
