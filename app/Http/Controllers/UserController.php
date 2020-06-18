<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUsers;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Solutionlocale\Commons\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('users.index')->with(['users' => User::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUsers $request)
    {
        // Filter out invalid roles
        $roles = array_intersect(Role::all()->pluck('name')->toArray(), $request->roles);

        // Create user (with invalid password)
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => '-'
        ]);

        $user->save();

        $user->regions()->sync($request->regions);
        $user->assignRole($roles);

        // Create password reset link
        $token = app('auth.password.broker')->createToken($user);
        $url = route('password.reset', ['token' => $token]);

        return redirect()->route('users.create')
            ->with('status', "Utilisateur créé. L'URL de réinitialisation du mot de passe est :<br> $url");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return view('users.edit')->with(['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function editSelf()
    {
        return view('users.edit-self')->with(['user' => Auth::user()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(StoreUsers $request, User $user)
    {
        if ($user->hasRole('super_admin') && !$request->user()->hasRole('super_admin')) {
            abort(401);
        }

        // Filter out invalid roles
        $roles = array_intersect(Role::all()->pluck('name')->toArray(), $request->roles);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->is_notifiable = $request->has('is_notifiable');
        $user->save();

        $user->regions()->sync($request->regions);
        $user->syncRoles($roles);

        return redirect()->back()->with('status', 'Profil modifié!');
    }

    public function updateSelf(Request $request)
    {
        $user = Auth::user();
        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->back()->with('status', 'Profil modifié!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
