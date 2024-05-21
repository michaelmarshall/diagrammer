export const defaultText = `
DiscourseUnit:
  name: Psalm 3; all phrase-level glosses are drafts
  DiscourseUnits:
    - DiscourseUnit:
        name: v. 1
        Fragment: 
          name: moved מִפְּנֵי אַבְשָׁלוֹם בְּנ to adverbially modify ברח instead of adjectivally modifying the object of the preposition
          Clause:
            Subject:
              noun: מִזְמוֹר a psalm
              Adjectival:
                PrepositionalPhrase:
                  Preposition:
                    preposition: לְ by
                  Object:
                    noun: 
                      - דָוִד 
                      - David
                  Complement:
                    PrepositionalPhrase:
                      Preposition:
                          preposition: 
                              - בְּ 
                              - when
                      Object:
                        Clause:
                          Subject:
                          Predicate:
                            ConstructChain:
                              verb-infinitive: 
                                - בָרְח 
                                - fled
                              suffix-pronoun: 
                                - וֹ 
                                - he
                            Adverbial:
                              PrepositionalPhrase:
                                Preposition:
                                  preposition: 
                                    - מִ 
                                    - from
                                Object:         
                                  ConstructChain:
                                    noun: 
                                      - פְּנֵי  
                                      - the presence
                                    Apposition:
                                      noun: 
                                        - אַבְשָׁלוֹם 
                                        - Absalom
                                      Nominal:
                                        ConstructChain:
                                          noun: 
                                            - בְּנ 
                                            - son
                                          suffix-pronoun: 
                                            - וֹ 
                                            - him
    - DiscourseUnit:
        name: v. 2
        Fragments:
          - Fragment:
              Vocative:
                noun: 
                  - יְהוָה 
                  - YHWH
          - Fragment:
              Clause:
                Subject:
                  ConstructChain:
                    noun: 
                      - צָרָ 
                      - adversaries
                    suffix-pronoun: 
                      - י 
                      - me
                Predicate:
                  verb: 
                    - רַבּוּ 
                    - have multiplied
                  adverb: 
                    - מָה 
                    - how
          - Fragment:
              Clause:
                Subject:
                  Nominal:
                    verb-participle: 
                      - קָמִים 
                      - those rising
                  Adjectival:
                    PrepositionalPhrase:
                      Preposition:
                        preposition: 
                          - עָלָ 
                          - against
                      Object:
                        suffix-pronoun: 
                          - י 
                          - me
                Predicate:
                  Complement:
                    noun: 
                      - רַבִּים 
                      - 
    - DiscourseUnit:
      name: v. 3
      Fragments:
        - Fragment:
            name: substantival ptc w/ obj, like Ps 91:2
            Clause:
              Subject:
                Clause:
                  Predicate:
                    verb-participle: 
                      - אֹמְרִים 
                      - those saying
                    Adverbial:
                      PrepositionalPhrase:
                        Preposition:
                          preposition: 
                            - לְ 
                            - about
                        Object:
                          ConstructChain:
                            noun: 
                              - נַפְשִׁ 
                              - soul
                            suffix-pronoun: 
                              - י 
                              - me
                    Object:
                      Clause:
                        Subject:
                          noun: 
                            - יְשׁוּעָתָה 
                            - salvation
                        Predicate:
                          Adverbial:
                            noun: 
                              - אֵין 
                              - there is no
                          Complement:
                            PrepositionalPhrase:
                              Preposition:
                                preposition: 
                                  - לּ 
                                  - for
                              Object:
                                suffix-pronoun: 
                                  - וֹ 
                                  - him
                            Adjectival:
                              PrepositionalPhrase:
                                Preposition:
                                  preposition: 
                                    - בֵ 
                                    - in
                                Object:
                                  noun: 
                                    - אלֹהִים 
                                    - God
              Predicate:
                Complement:
                  noun: 
                    - רַבִּים 
                    - many
        - Fragment:
            particle: 
              - סֶלָה 
              - selah

`;
