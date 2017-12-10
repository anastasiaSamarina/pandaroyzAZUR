from bottle import route, run, app, request, response
from beaker.middleware import SessionMiddleware
from time import time


session_opts = {
    'session.type': 'memory',
    'session.save_accessed_time': True,
    'session.auto': True,
    'session.timeout': 1800
}

app = SessionMiddleware(app(), session_opts)
mlsecond_in_day = 86400000


def get_current_time():
    return int(round(time() * 1000))


@route('/')
def run_session():
    today = int(request.cookies.get('current_date', default='0'))
    if get_current_time() - today >= mlsecond_in_day:
        response.set_cookie('current_date', str(get_current_time()))
        response.set_cookie('today_visit', str(0))

    v_all = int(request.cookies.get('total_visit', default='0'))
    v_today = int(request.cookies.get('today_visit', default='0'))
    session = request.environ.get('beaker.session')
    client_ip = request.environ.get('REMOTE_ADDR')

    if session.get('client_ip') is None:
        session['client_ip'] = client_ip
        v_all += 1
        v_today += 1
        response.set_cookie('total_visit', str(v_all))
        response.set_cookie('today_visit', str(v_today))
    return '''
        <div>You visited this page {} times for all time</div>
        <div>You visited this page {} times for today</div>
        '''.format(v_all, v_today)


run(
    app=app,
    host='localhost',
    port=5000,
    debug=True
)
