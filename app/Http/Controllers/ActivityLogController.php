<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Solutionlocale\Commons\Models\User;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activities = Activity::orderBy('created_at', 'DESC')->get();

        // dd($activities->first()->properties['old']);

        return view('activity-log.index')->with([
            'activities' => $activities,
        ]);
    }
    public function showUserActivity(User $user)
    {
        return view('activity-log.index')->with([
            'activities' => $user->actions->reverse(),
        ]);
    }
}
