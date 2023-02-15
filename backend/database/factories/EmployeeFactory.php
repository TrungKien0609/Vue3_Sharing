<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Employee::class;
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' =>$this->faker->unique()->safeEmail(),
            'country' => $this->faker->name(),
            "age" => random_int(0,100),
            "salary" => random_int(1000,20000),
        ];
    }
    // public function suspended()
    // {
    //     return $this->state(function (array $attributes) {
    //         return [
    //             'email' => 'trungkien7300@gmail.com',
    //         ];
    //     });
    // }
}
