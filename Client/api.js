currentWeekNumber = require('current-week-number');

// verificar se existe algum setor contendo esse id
function sector_exists(sector_id){
  return false
}

// verificar se existe algum profile contendo esse id
function profile_exists(profile_id){
  return false
}

function get_month(date){
  //var month = date.getMonth() + 1
  //return month;
  return false
}

function get_year(date){
  //var year = date.getFullYear()
  //return year;
  return false
}

function get_schedule_duration(start_time, end_time){
  // The diference between times is given in milliseconds. We are expecting hours,
  //so wu divide by 3600000.0 that is the number of milliseconds in 1 hour
  //var schedule_duration = (end_time - start_time)/3600000.0
  //return schedule_duration
  return false
}

module.exports = function api(options){

  this.add('role:api,path:create', function(msg,respond){
    var id = msg.args.query.id
    var date = new Date(msg.args.body.date)
    var start_time = new Date(msg.args.body.start_time)
    var end_time = new Date(msg.args.body.end_time)
    var profile_id = msg.args.body.profile_id
    var sector_id = msg.args.body.sector_id

    if(start_time > end_time){
      this.act('role:schedule,cmd:create',{
      }, respond(null, {success:false, message: 'Horários de Inicio e Fim estão em comflito'}))
    }else if(sector_id == null || sector_exists(sector_id)){
      this.act('role:schedule,cmd:create',{
      }, respond(null, {success:false, message: 'Setor não pode ser vazio'}))
    }else if(profile_id == null || profile_exists(profile_id)){
      this.act('role:schedule,cmd:create',{
      }, respond(null, {success:false, message: 'Plantonista não pode ser vazio'}))

    }else{
      this.act('role:schedule,cmd:create',{
        id:id
        date:date,
        start_time:start_time,
        end_time:end_time,
        sector_id:sector_id,
        profile_id:profile_id
      }, respond)
    }
  })


  this.add('role:api,path:createScheduleSettings', function(msg, respond){
    var id = msg.args.query.id
    var max_hours_month = msg.args.body.max_hours_month
    var max_hours_week = msg.args.body.max_hours_week
    var min_hours_month = msg.args.body.min_hours_month
    var min_hours_week = msg.args.body.min_hours_week
    var profile_id = msg.args.body.profile_id

    this.act('role:schedule,cmd:createScheduleSettings',{
      id:id,
      max_hours_month:max_hours_month,
      max_hours_week:max_hours_week,
      min_hours_month:min_hours_month,
      min_hours_week:min_hours_week,
      profile_id:profile_id
    }, respond)
  });

    this.add('role:api,path:listDay', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
        } else {
            currentDate.setMonth(month);
        }
        if (day == undefined) {
            day = currentDate.getDate() - 1;
            day = JSON.stringify(day);
        }
        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listDay', {
            day: day,
            id: id
        }, respond)
    });

    this.add('role:api,path:listSchedule', function(msg, respond){
      this.act('role:schedule, cmd:listSchedule',{}, respond)

    });
    
    this.add('role:api,path:listMonth', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var month = msg.args.query.month;
        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
            month = JSON.stringify(month);
        }

        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listMonth', {
            month: month,
            id: id
        }, respond)
    });

    this.add('role:api,path:listSchedule', function (msg, respond) {
        this.act('role:schedule, cmd:listSchedule', {}, respond)

    });
    this.add('role:api,path:listYear', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        if (year == undefined) {
            year = currentDate.getFullYear();
            year = JSON.stringify(year);
        }
        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listYear', {
            year: year,
            id: id
        }, respond)
    });

    this.add('role:api,path:listWeek', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        var week = msg.args.query.week;
        console.log(week);
        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
        } else {
            currentDate.setMonth(month);
        }
        if (day == undefined) {
            day = currentDate.getDate() - 1;
        } else {
            currentDate.setDate(day);
        }
        if (week == undefined) {

            var week = currentWeekNumber(currentDate);

            week = JSON.stringify(week);

        }

        var id = msg.args.query.id;

        console.log(id);


        this.act('role:schedule,cmd:listWeek', {
            week: week,
            id: id
        }, respond)
    });


    this.add('role:api,path:listHourWeek', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        var week = msg.args.query.week;

        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
        } else {
            currentDate.setMonth(month);
        }
        if (day == undefined) {
            day = currentDate.getDate() - 1;
        } else {
            currentDate.setDate(day);
        }
        if (week == undefined) {

            var week = currentWeekNumber(currentDate);

            week = JSON.stringify(week);

        }

        var id = msg.args.query.id;


        this.act('role:schedule,cmd:listHourWeek', {
            week: week,
            id: id
        }, respond)
    });

    this.add('role:api,path:listSectorDay', function (msg, respond) {
        var day = msg.args.query.day;
        var sector = msg.args.query.sector;
        this.act('role:schedule,cmd:listSectorDay', {
            day: day,
            sector: sector
        }, respond)
    });

    this.add('role:api,path:listSectorMonth', function (msg, respond) {
        var month = msg.args.query.month;
        var sector =  msg.args.query.sector;
        this.act('role:schedule,cmd:listSectorMonth', {
            month: month,
            sector: sector
        }, respond)
    });

    this.add('role:api,path:listSectorYear', function (msg, respond) {
        var year = msg.args.query.year;
        var sector =  msg.args.query.sector;
        this.act('role:schedule,cmd:listSectorYear', {
            year: year,
            sector: sector
        }, respond)
    });

    this.add('role:api,path:listSectorWeek', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        var week = msg.args.query.week;
        if(year == undefined){
            year = currentDate.getFullYear();
        }else {
            currentDate.setFullYear(year);
        }
        if(day == undefined){
            day = currentDate.getDate() - 1;
        }else {
            currentDate.setDate(day);
        }
        if(month == undefined){
            month = currentDate.getMonth() + 1;
        }else{
            currentDate.setMonth(month);
        }
        if(week == undefined){

        var week = currentWeekNumber(currentDate);

        week = JSON.stringify(week);

        }

        var sector =  msg.args.query.sector;


        this.act('role:schedule,cmd:listSectorWeek', {
            week: week,
            sector: sector
        }, respond)
    });


    this.add('role:api,path:error', function(msg, respond){
        this.act('role:schedule, cmd:error',{}, respond)
});


    this.add('init:api', function (msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/api/schedule',
                pin: 'role:api,path:*',
                map: {
                    create: { POST: true,
                              auth: {
                                strategy: 'jwt',
                                fail: '/api/schedule/error'
                      }
                    },
                    listDay: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listSchedule: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listMonth: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listYear: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listWeek: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listHourWeek: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listSectorDay: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listSchedule: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listSectorMonth: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listSectorYear: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                     listSectorWeek: { GET: true,
                       auth: {
                           strategy: 'jwt',
                           fail: '/api/schedule/error'
                        }
                    },
                    createScheduleSettings: { POST:true,
                                auth: {
                                  strategy: 'jwt',
                                  fail: '/api/schedule/error',
                                }},
                    error: {GET: true }
                }
            }
        }, respond)
    })
}
