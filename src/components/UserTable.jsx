// src/components/UserTable.jsx
export default function UserTable({ users }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Nama</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Telepon</th>
          <th style={styles.th}>Website</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={styles.td}>{user.id}</td>
            <td style={styles.td}>{user.name}</td>
            <td style={styles.td}>{user.email}</td>
            <td style={styles.td}>{user.phone}</td>
            <td style={styles.td}>{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};
