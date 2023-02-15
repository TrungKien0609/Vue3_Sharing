<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Employee::factory()->count(3)->create();
        Employee::create([
            'name' => 'London to Paris123',
            "country" => "vietnam123",
            "salary" => 20000,
            "email" => "trungkien7300@gmail.com123",
            "age" => 25
        ]);
    }
}
