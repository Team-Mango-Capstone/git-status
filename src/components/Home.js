import '../css/Home.css';

function Home() {
  const leftAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&lt;</span>
  );
  const rightAngleBrace = (
    <span style={{ color: 'grey', fontSize: '1.8rem' }}>&gt;</span>
  );
  const welcome = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>welcome</span>
  );
  const welcomeClose = (
    <span style={{ color: '#58a6ff', fontSize: '1.8rem' }}>/welcome</span>
  );

  return (
    <div className='home'>
      <h1>
        {leftAngleBrace}
        {welcome}
        {rightAngleBrace}
        {localStorage.getItem('name')}
        {leftAngleBrace}
        {welcomeClose}
        {rightAngleBrace}
      </h1>
      {/* <img src={localStorage.getItem('profilePic')} alt='profile pic' /> */}
    </div>
  );
}

export default Home;
