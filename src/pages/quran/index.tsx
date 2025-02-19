import { useNavigate } from 'react-router';
import Hadith from '../../components/Hadith';
import Button from './components/Button';

export default function QuranPage() {
  const navigate = useNavigate();

  return (
    <section className="grid h-full place-content-center p-3">
      <div className="space-y-4">
        <div>
          <Hadith page="quran" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button text="تصفح" onClick={() => navigate('browsing')} />
          <Button text="استمع" onClick={() => navigate('listening')} />
        </div>
      </div>
    </section>
  );
}
