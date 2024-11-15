<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スケジュール管理</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        #calendar-container {
            max-width: 900px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        #calendar {
            padding: 20px;
        }
        .fc-toolbar {
            padding: 15px;
            background-color: #4a90e2;
            color: white;
        }
        .fc-toolbar h2 {
            font-size: 1.5em;
        }
        .fc-button {
            background-color: #4a90e2 !important;
            color: white !important;
            border: none !important;
            box-shadow: none !important;
            text-shadow: none !important;
        }
        .fc-day-header {
            background-color: #f8f9fa;
            color: #333;
            font-weight: bold;
            padding: 10px 0 !important;
        }
        .fc-event {
            border: none;
            padding: 5px;
            border-radius: 3px;
            cursor: pointer;
        }
        #event-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 300px;
            border-radius: 5px;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        #event-form input[type="text"] {
            width: 100%;
            padding: 8px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        #event-form button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #event-form button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div id="calendar-container">
        <div id="calendar"></div>
    </div>

    <div id="event-modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>イベントの詳細</h2>
            <form id="event-form">
                <input type="text" id="event-title" placeholder="イベントのタイトル" required>
                <button type="submit">保存</button>
            </form>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            var calendar = $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                buttonText: {
                    today: '今日',
                    month: '月',
                    week: '週',
                    day: '日'
                },
                events: '/api/events',
                selectable: true,
                selectHelper: true,
                select: function(start, end) {
                    showEventModal(start, end);
                },
                eventClick: function(event) {
                    if (confirm('このイベントを削除しますか？')) {
                        $.ajax({
                            url: '/api/events/' + event.id,
                            method: 'DELETE',
                            success: function() {
                                calendar.fullCalendar('removeEvents', event._id);
                            }
                        });
                    }
                }
            });

            var modal = document.getElementById('event-modal');
            var span = document.getElementsByClassName("close")[0];
            var form = document.getElementById('event-form');
            var titleInput = document.getElementById('event-title');

            function showEventModal(start, end) {
                modal.style.display = "block";
                titleInput.value = '';
                form.onsubmit = function(e) {
                    e.preventDefault();
                    var title = titleInput.value;
                    if (title) {
                        var eventData = {
                            title: title,
                            start: start.format(),
                            end: end.format()
                        };
                        $.ajax({
                            url: '/api/events',
                            method: 'POST',
                            data: eventData,
                            success: function(response) {
                                calendar.fullCalendar('renderEvent', {
                                    id: response.id,
                                    title: title,
                                    start: start,
                                    end: end,
                                    allDay: false
                                }, true);
                                calendar.fullCalendar('unselect');
                            }
                        });
                        modal.style.display = "none";
                    }
                };
            }

            span.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        });
    </script>
</body>
</html>
