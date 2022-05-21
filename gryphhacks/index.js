//Search Bar

var searchBar = document.getElementById('search');

searchBar.addEventListener('keyup', )


function getPosts(){
    if(posts.length>0){
        for (i = 0; i < posts.length; i++) {

            temp  = document.createElement('div')
            temp.className = "post"
            temp.id = "post" + i
            document.getElementById("main").appendChild(temp)

            tempPosition = document.createElement('h2')
            tempPosition.innerHTML = posts[i][0]
            document.getElementById("post" + i).appendChild(tempPosition)

            if(posts[i][1]){
                tempService = document.createElement('h2')
                tempService.className = "service"
                tempService.innerHTML = posts[i][1]
                document.getElementById("post" + i).appendChild(tempService)
            }
            if(posts[i][4]){
                tempLocation = document.createElement('h2')
                tempLocation.className = "location"
                tempLocation.innerHTML = posts[i][4]
                document.getElementById("post" + i).appendChild(tempLocation)
            }
            if(posts[i][2] && posts[i][3]){
                tempTime = document.createElement('h2')
                tempTime.className = "time"
                var Sdate = new Date(posts[i][2])
                var Edate = new Date(posts[i][3])
                tempTime.innerHTML = Sdate.getHours() + ":" + Sdate.getMinutes() + " - " + Edate.getHours() + ":" + Edate.getMinutes()
                document.getElementById("post" + i).appendChild(tempTime)
            }
            if(posts[i][5]){
                tempDesc = document.createElement('p')
                tempDesc.className = "description"
                tempDesc.innerHTML = posts[i][4]
                document.getElementById("post" + i).appendChild(tempDesc)
            }
        }
    }
}