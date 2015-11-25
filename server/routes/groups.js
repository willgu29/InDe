var express = require('express');
var router = express.Router();

/* GET /api/groups listing. */


//?level=# required
app.get("/", function (req, res) {
  console.log("/api/groups GET");
  var levelQuery = req.query.level;
  Group.find({userIds_inGroup: req.user._id, level: levelQuery}, function (err, groupObjects) {
    if (err) return console.error(err);
    res.json(groupObjects);
  }).limit(req.body.limit).skip(req.body.skip);
});

app.get("/:groupID", function (req, res) {
  console.log("/api/groups/:groupID GET " + req.params.groupID);
  Group.findOne({_id:req.params.groupID}, function (err, group) {
    if (err) return console.error(err);
    res.json(group);
  });
});


app.post("/" , loggedIn, function (req, res){
  console.log("/api/groups POST");


  var newGroup = new Group({
                    name: req.body.groupName,
                    description: req.body.description,
                    userIds_inGroup: [req.user._id],
                    fullNames_inGroup: [req.user.fullName],
                    emails_inGroup: [req.user.email],
                    adminIds: [req.user._id],
                    adminFullNames: [req.user.fullName], 
                    rootGroup_id: req.body.parentGroupID,
                    rootGroup_name: req.body.parentGroupName,
                    level: req.body.level
  });

  newGroup.save(function (err, newGroup) {
    if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { 
        console.log(newGroup); 
        req.user.groupsIn_ids.push(newGroup._id);
        req.user.groupsIn_names.push(newGroup.name);
        req.user.save(function (err, user) {
          if (err) {

          } else {
            return res.json({info:"success", newGroup_id: newGroup._id});
          }
        });

      }
    });
});

app.post("/:rootGroupID" , loggedIn, function (req, res){
  console.log("/api/groups/:rootGroupID POST " + req.params.rootGroupID);


  Group.findOne({_id:req.params.rootGroupID}, function (err, rootGroup) {
    if (err) {console.error(err); return res.json({info: 
      "There was an error. Please try again in a minute."});
      } else { 
        console.log("Root group: " + rootGroup);
        var newLevel = rootGroup.level + 1; //?
        var newGroup = new Group({
                          name: req.body.groupName,
                          description: req.body.description,
                          userIds_inGroup: [req.user._id],
                          fullNames_inGroup: [req.user.fullName],
                          emails_inGroup: [req.user.email],
                          adminIds: [req.user._id],
                          adminFullNames: [req.user.fullName],
                          rootGroup_id: rootGroup._id,
                          rootGroup_name: rootGroup.name,
                          level: newLevel });

        newGroup.save(function (err, newGroup) {
            if (err) {console.error(err); return res.json({info: 
              "There was an error. Please try again in a minute."});
              } else { 
                rootGroup.childrenGroup_ids.push(newGroup._id);
                rootGroup.childrenGroup_names.push(newGroup.name);
                rootGroup.save(function (err, updatedGroup) {
                  if (err) {console.error(err); return res.json({info: 
                    "There was an error. Please try again in a minute."});
                    } else { console.log("Updated Group: " + updatedGroup); return res.json({info:
                    "success", _id:newGroup._id, updatedGroup_id: updatedGroup._id});}
                });
              }
        });
      }
    });
});


module.exports = router;
