type Props = {
  page: string;
};

export default function Hadith({ page }: Props) {
  return (
    <>
      {page == 'azkar' ? (
        <div className="text-justify text-sm font-medium">
          <span>قال صلى الله عليه و سلم: </span>
          <span className="text-secondary/90">
            أَلَا أُنَبِّئُكم بِخَيْرِ أعمالِكُم، وأَزْكاها عِندَ مَلِيكِكُم،
            وأَرفعِها في دَرَجاتِكُم، وخيرٌ لكم من إِنْفاقِ الذَّهَب والوَرِقِ،
            وخيرٌ لكم من أن تَلْقَوا عَدُوَّكم، فتَضْرِبوا أعناقَهُم، ويَضْرِبوا
            أعْناقكُم، قالوا بَلَى، قال: ذِكْرُ اللهِ
          </span>
        </div>
      ) : page == 'quran' ? (
        <div className="text-justify text-sm font-medium">
          <span>قال صلى الله عليه و سلم: </span>
          <span className="text-secondary/90">
            إنَّ للَّهِ أَهْلينَ منَ النَّاسِ قالوا: يا رسولَ اللَّهِ ، من هُم ؟
            قالَ: هم أَهْلُ القرآنِ ، أَهْلُ اللَّهِ وخاصَّتُهُ
          </span>
        </div>
      ) : (
        'Null'
      )}
    </>
  );
}
