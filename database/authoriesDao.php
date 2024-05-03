<?php
    require "connect.php";

    function selectAll($connect)
    {
        $sql="SELECT * 
        FROM authorizes";
        $result=mysqli_query($connect,$sql);
        if ($result->num_rows > 0) {
            $authories=[];
            while ($row = $result->fetch_assoc()) {
                $authories[]=$row;
            }
            echo json_encode($authories);
        } 
    }

    function getTaskAccountCurrent ($connect) {
        session_start();
        $task = [];
        if (isset($_SESSION["accountCurrent"])) {
            $id = $_SESSION["accountCurrent"]["idAccount"];
            $sql = "SELECT PARTICULAR_TASKS.ID_TASK
            FROM PARTICULAR_TASKS JOIN ACCOUNTS
            ON PARTICULAR_TASKS.ID_AUTHORIZE = ACCOUNTS.ID_AUTHORIZE
            WHERE ACCOUNTS.ID_ACCOUNT = $id";
            
            $result = mysqli_query($connect, $sql);
            while ($row = mysqli_fetch_assoc($result)) {
                $task[] = $row;
            }
        }
        return json_encode($task);
    }
    function selectAllTask($connect)
    {
        $sql="SELECT * 
        FROM tasks";
        $result=mysqli_query($connect,$sql);
        if ($result->num_rows > 0) {
            $authories=[];
            while ($row = $result->fetch_assoc()) {
                $authories[]=$row;
            }
            echo json_encode($authories);
        } 
    }
    function selectParticularTask($connect,$id)
    {
        $sql="SELECT * 
        FROM particular_tasks
        WHERE ID_AUTHORIZE=$id";
        $result=mysqli_query($connect,$sql);
        if ($result->num_rows > 0) {
            $pttask=[];
            while ($row = $result->fetch_assoc()) {
                $pttask[]=$row;
            }
            echo json_encode($pttask);
        }
    }
    function checkName($connect,$name)
    {
        $sql="SELECT * 
        FROM authorizes
        WHERE AUTHORIZE_NAME = '$name'";
        $result=mysqli_query($connect,$sql);
        if ($result->num_rows > 0) {
            return true;
        }
        return false;
    }
    function selectAllWithoutCustomer ($connect) {
        $sql = "SELECT *
        FROM AUTHORIZES
        WHERE ID_AUTHORIZE != 1";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            $author = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $author[] = $row;
            }
        }
        echo json_encode($author);
    }

    function insertAu($connect,$name)
    {
        $sql="INSERT INTO AUTHORIZES (AUTHORIZE_NAME)
        VALUES('$name')";
        if(mysqli_query($connect,$sql))
        {
            echo 1;
        }
        else
        {
            echo 0;
        }
    }
    function deletePtTask($connect,$id)
    {
        $sql="DELETE FROM PARTICULAR_TASKS
        WHERE ID_AUTHORIZE=$id";
          if(mysqli_query($connect,$sql))
          {
              echo 1;
          }
          else
          {
              echo 0;
          }
    }
    function insertPtTask($connect,$idAu,$idTask)
    {
        $sql="INSERT INTO PARTICULAR_TASKS (ID_TASK,ID_AUTHORIZE)
        VALUES($idTask,$idAu)";
          if(mysqli_query($connect,$sql))
          {
              echo 1;
          }
          else
          {
              echo 0;
          }
    }
    function deleteAu($connect,$id)
    {
        $sql="DELETE FROM AUTHORIZES
        WHERE ID_AUTHORIZE=$id";
          if(mysqli_query($connect,$sql))
          {
              echo 1;
          }
          else
          {
              echo 0;
          }
    }

    if($_GET['type']==1)
    {
        selectAll($connect);
    }
    else if ($_GET["type"] == 2) {
        selectAllWithoutCustomer($connect);
    }
    else if($_GET['type']==3)
    {
        selectParticularTask($connect,$_GET['id']);
    }
    else if($_GET['type']==4)
    {
        if(checkName($connect,$_GET['name']))
        {
            echo 0;
        }
        else
        {
            echo 1;
        }
    }
    else if($_GET['type']==5)
    {
        insertAu($connect,$_GET['name']);
    }
    else if($_GET['type']==6)
    {
        deletePtTask($connect,$_GET['id']);
    }
    else if($_GET['type']==7)
    {
        insertPtTask($connect,$_GET['idAu'],$_GET['idTask']);
    }
    else if($_GET['type']==8)
    {
        deleteAu($connect,$_GET['id']);
    }
    else if($_GET['type']==9)
    {
        selectAllTask($connect);
    }
    else if ($_GET["type"] == 10) {
        echo getTaskAccountCurrent($connect);
    }
    
    