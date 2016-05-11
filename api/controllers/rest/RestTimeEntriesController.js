/**
 * TimeEntriesController
 *
 * @description :: Server-side logic for managing Timeentries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCSRFToken: function (req, res) {
    return res.json(200, _csrf);
  },
  getAllTimeEntries: function (req, res) {
    var time_entries = TimeEntries.find({
      limit: 20
    }).exec(function (err, time_entries) {
      return res.json(200, time_entries);
    });
  },
  saveNewTimeEntry:function(req,res){
      console.log(req.body.project);
    TimeEntries.create({
        desc: req.body.desc,
        user_id: req.user.id,
        project_id: req.body.project.id,
        project_name: req.body.project.name,
        client_name: req.body.client_name,
        time: req.body.time
    }).exec(function (err, time_entry) {
      if(!err){
        sails.sockets.blast('time-entry-created', {
          time_entry: time_entry
        });
        return res.json(200, time_entry);
      }else{
        console.log(err);
      }
    });
  }
};

