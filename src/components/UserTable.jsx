export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4 text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">ID</th>
            <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Nama</th>
            <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Email</th>
            <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Telepon</th>
            <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2">{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
