<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\VolunteerApplication;
use Illuminate\Database\Seeder;

class VolunteerApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'utilisateur')->get();

        $applications = [
            [
                'user_index' => 0,
                'name' => 'Ahmed Bennani',
                'email' => 'ahmed@refuconnect.ma',
                'phone' => '06 12 34 56 78',
                'message' => 'Disponible les weekends pour aider aux soins et aux promenades. Expérience avec les chiens de grande taille.',
                'status' => 'accepted',
                'notes' => 'Très motivé. A déjà fait du bénévolat dans un autre refuge.',
            ],
            [
                'user_index' => 1,
                'name' => 'Fatima Tahir',
                'email' => 'fatima@refuconnect.ma',
                'phone' => '06 98 76 54 32',
                'message' => 'Étudiante vétérinaire, disponible 2 après-midis par semaine. Peut aider aux soins médicaux de base.',
                'status' => 'accepted',
                'notes' => 'Profil très intéressant. Compétences médicales utiles.',
            ],
            [
                'user_index' => 2,
                'name' => 'Karim El Mansouri',
                'email' => 'karim@refuconnect.ma',
                'phone' => '07 11 22 33 44',
                'message' => 'Retraité, beaucoup de temps libre. Peut aider à l\'accueil des visiteurs et à l\'entretien des locaux.',
                'status' => 'reviewed',
                'notes' => 'À former sur les procédures d\'accueil.',
            ],
            [
                'user_index' => 3,
                'name' => 'Zahra Hassi',
                'email' => 'zahra@refuconnect.ma',
                'phone' => '06 55 44 33 22',
                'message' => 'Graphiste, peux aider à la communication et à la création de supports pour le refuge.',
                'status' => 'pending',
                'notes' => null,
            ],
            [
                'user_index' => 4,
                'name' => 'Youssef Alami',
                'email' => 'youssef@refuconnect.ma',
                'phone' => '07 66 77 88 99',
                'message' => 'Disponible pour les événements et les collectes de fonds. Bon relationnel.',
                'status' => 'pending',
                'notes' => null,
            ],
            [
                'user_index' => 5,
                'name' => 'Aisha Bouazza',
                'email' => 'aisha@refuconnect.ma',
                'phone' => '06 11 22 33 44',
                'message' => 'Passionnée par les chats, peux aider au toilettage et à la socialisation des chatons.',
                'status' => 'rejected',
                'notes' => 'Rejeté: disponible uniquement le soir, pas compatible avec les horaires du refuge.',
            ],
        ];

        foreach ($applications as $data) {
            $user = $users->get($data['user_index']);

            VolunteerApplication::create([
                'user_id' => $user?->id,
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'message' => $data['message'],
                'status' => $data['status'],
                'notes' => $data['notes'],
            ]);
        }
    }
}
