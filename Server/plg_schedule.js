var schedule_db = 'schedules'
var schedule_settings_db = 'scheduleSettings',
  return result;
module.exports = function(options){
    this.add('role:schedule,cmd:createSchedule', function create (msg,respond) {
      var schedule = this.make(schedule_db)
      // var scheduleSettings = this.make()
      schedule.start_time = new Date(msg.start_time)
      schedule.end_time = new Date(msg.end_time)
      schedule.sector_id = msg.sector_id
      schedule.profile_id = msg.profile_id
      var worked_hours=0;
      var result = {};

      // validar apenas mongo object IDs no caso do profile e do sector

      result = setTimeout(validate_schedule_conflit, 100, )
        schedule.start_time
        schedule.end_time
        schedule.sector_id
        schedule.profile_id
      )
      // validate if have any schedule conflict has occurred
      schedule.list$(
      {
        and$: [
          {or$:[
            {start_time: {
              $gte: schedule.start_time,
              $lt: schedule.end_time
            }},
            {end_time: {
              $lte: schedule.end_time,
              $gt: schedule.start_time
            }}
          ]},
          {profile_id: schedule.profile_id},
          {sector_id: schedule.sector_id}
        ]
      },
      function(err,list){
        if(list.length > 0){
          list.forEach(function(time){
            console.log("time: " + time)
            console.log("Result no callback: ")
            console.log(result)
            result.conflicts_error = 'Plantonista já possui um horário de '+ time.start_time + ' à ' + time.end_time + '.';
          })
          respond(null, {})
        }else{
          console.log("Nenhum conflito de horário encontrado");
        }
      })

      console.log("result:  aqui  ")
      console.log(result)

      day = parseInt(schedule.start_time.getDate());
      start_day = new Date(schedule.start_time);
      end_day = new Date(schedule.start_time);
      // Criando intervalo de 1 dia
      start_day.setHours(0, 0);
      end_day.setHours(24,0);
      schedule.list$(
      {
        and$: [
          {or$:[
            {start_time: {
              $gte: start_day,
              $lt: end_day
            }},
            {end_time: {
              $lte: end_day,
              $gte: start_day
            }}
          ]},
          {profile_id: schedule.profile_id},
          {sector_id: schedule.sector_id}
        ]
      },
      function(err,list){
        list.forEach(function(time){
          console.log('Parcial' + worked_hours);
          worked_hours += get_schedule_duration(time.start_time, time.end_time)
        })
      })

      start_of_week = s = new Date(schedule.start_time.getFullYear(), schedule.start_time.getMonth(), (schedule.start_time.getDate() - schedule.start_time.getDay()), 0, 0, 0);
      end_of_week = s = new Date(schedule.start_time.getFullYear(), schedule.start_time.getMonth(), (schedule.start_time.getDate() - schedule.start_time.getDay() + 7), 0, 0, 0);



      console.log(schedule.start_time);
      month = parseInt(schedule.start_time.getMonth());
      year = parseInt(schedule.start_time.getFullYear());
      start_month = new Date(year, month, 1);
      end_month = new Date(year, month+1, 1);

      console.log("start_month" + start_month);
      console.log("end_month" + end_month);
      schedule.list$(
        {
          start_time: {
            $gte: start_month,
            $lt: end_month
          },
          profile_id: schedule.profile_id,
          sector_id: schedule.sector_id
        },
        function(err,list){
          list.forEach(function(time){
            console.log('Parcial' + worked_hours);
            worked_hours += get_schedule_duration(time.start_time, time.end_time)
          })
        })

        console.log("Final" + worked_hours);

      // validar min/max horas mes
      // if (worked_hours > scheduleSettings.max_hours_month) {
      //   respond(null, {success:false, message: 'Este funcionário já recebeu a carga maxima mensal'})
      // validar min/max horas semana
      // }else if (worked_hours > scheduleSettings.max_hours_week) {
      //   respond(null, {success:false, message: 'Este funcionário já recebeu a carga maxima semanal'})
      // }


      if (Object.entries(result)[0]){
        console.log("Result:");
        console.log(result);
        result.success = false;
        respond(null, result)
      //else everything sucess
      }else{
        schedule.save$(function(err,schedule){
          respond(null, schedule)
        })
      }
  })

// #############################################################################

  this.add('role:schedule, cmd:listByProfile', function (msg, respond) {
      var schedule = this.make(schedule_db);
      var id = msg.id;
      console.log("id informado:" + id);
      schedule.list$(
        {
          profile_id: id,
        },
        function (error, schedule) {
          console.log("Schedules:" + schedule);
          respond(null, schedule);
        }
      );
  })

// #############################################################################

  this.add('role:schedule,cmd:listYearByProfile', function (msg, respond) {
    console.log(msg);
    var schedule = this.make(schedule_db);
    schedule.profile_id = msg.profile_id;
    start_year = msg.start_year;
    end_year = msg.end_year;

    schedule.list$(
      {
        start_time: {
          $gte: start_year,
          $lt: end_year
        },
        profile_id: schedule.profile_id,
      },
      function(err,list){
        respond (null, list)
    })
  })

// #############################################################################

this.add('role:schedule,cmd:listYearBySector', function (msg, respond) {
  console.log(msg);
  var schedule = this.make(schedule_db);
  schedule.sector_id = msg.sector_id;
  start_year = msg.start_year;
  end_year = msg.end_year;

  schedule.list$(
    {
      start_time: {
        $gte: start_year,
        $lt: end_year
      },
      sector_id: schedule.sector_id,
    },
    function(err,list){
      respond (null, list)
  })
})

// #############################################################################

this.add('role:schedule,cmd:listYearByUser', function (msg, respond) {
  console.log(msg);
  var schedule = this.make(schedule_db);
  user_id = msg.user_id;
  start_year = msg.start_year;
  end_year = msg.end_year;

  //buscar lista de profile_id a partir do user_id
  profiles_id = [12, 1023, 131, 1231]

  schedule.list$(
    {
      start_time: {
        $gte: start_year,
        $lt: end_year
      },
      profile_id: [
        12,
        1023,
        131,
        1231
      ],
    },
    function(err,list){
      respond (null, list)
  })
})

// #############################################################################

  this.add('role:schedule, cmd:createScheduleSettings', function error(msg, respond){
    var scheduleSettings = this.make(schedule_settings_db)
    scheduleSettings.max_hours_month = parseInt(msg.max_hours_month)
    scheduleSettings.max_hours_week = parseInt(msg.max_hours_week)
    scheduleSettings.max_hours_day = parseInt(msg.max_hours_day)
    scheduleSettings.min_hours_month = parseInt(msg.min_hours_month)
    scheduleSettings.min_hours_week = parseInt(msg.min_hours_week)
    scheduleSettings.min_hours_day = parseInt(msg.min_hours_day)
    scheduleSettings.templates = msg.templates

    scheduleSettings.save$(function(err, scheduleSettings){
      respond(null, scheduleSettings)
    })
  })

// #############################################################################

  this.add('role:schedule, cmd:error', function error(msg, respond) {
      respond(null, { success: false, message: 'acesso negado' });
  })
}
