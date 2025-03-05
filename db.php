
$servername = "sql103.infinityfree.com"; // Your InfinityFree Host Name
$username = "if0_38454858"; // Your InfinityFree Username
$password = "30x55WZ3a4PHGbC"; // Your InfinityFree vPanel Password
$dbname = "if0_38454858_mywebsite_db"; // Your InfinityFree Database Name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
